const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const jwt = require('jsonwebtoken');
const authStatus = require('../controllers/authController')
const logout = require('../controllers/authController')
const setup2FA = require('../controllers/authController')
const verify2FA = require('../controllers/authController')
const reset2FA = require('../controllers/authController')
require('../config/passportConfig')
const userValidation = require('../validation/userValidation')

//Registration Router
router.post("/registration", async (req, res) => {
    try {
        const { body: { username, password } } = req;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashPassword,
            isMfaActive: false,
        });
        await User.create(newUser)
        return res.status(201).json({ message: 'user created successfully..!' });
    } catch (error) {
        res.status(500).send({ error: "Error in registering", message: error })
    }
})

//Login Router
router.post("/login", passport.authenticate('local'), (req, res) => {
    const { user } = req;
    return res.status(200).json({
        message: "user loged successfully..!",
        username: user.username
    })
})

//Auth status Router
router.get("/status", (req, res) => {
    if (req.user) {
        return res.status(200).json({
            message: "user is in login status..!",
            username: req.user.username,
            isMfaActive: req.user.isMfaActive,
        })
    }

    return res.status(401).json({message: "Unotherized user"});
})

//Logout Router
router.post("/logout", (req, res) => {
    req.logOut((error) => {
        if (error) return res.status(401).send({message: "User not logged in"});
        return res.status(200).json({message: "User loged out successfully..!"});
    })
})

//2 fa setup
router.post("/2FA/setup", userValidation, async (req, res) => {
    try {
        console.log("Req.user is : ", req.user);
        const user = req.user;
        var secret = speakeasy.generateSecret();
        console.log("Secret object : ", secret);
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${req.user.username}`,
            issuer: 'prajwal.com',
            encoding: 'base32',
        })
        const qrImageUrl = await qrcode.toDataURL(url);
        res.status(200).json({
            qrcode: qrImageUrl
        })
    } catch (error) {
        return res.status(500).json({error: "Error in 2FA setup", message: error});
    }
})

//2fa verify Router
router.post("/2FA/verify", userValidation, (req, res) => {
    try {
        const { token } = req.body;
        const user = req.user;

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token,
        });

        if (verified) {
            const jwtToken = jwt.sign(
                { username : user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1hr" }
            );
            res.status(200).json({message: "2FA sucessful", token: jwtToken});
        } else {
            res.status(400).json({message: "Invalid 2FA token"});
        }
    } catch (error) {
        return res.status(500).json({error: "Error in 2FA verification", message: error});
    }
})

//reset Router
router.post("/2FA/reset", async (req, res) => {
    try {
        const {user} = req;
        user.twoFactorSecret = "";
        user.isMfaActive = false;
        await user.save();
        res.status(200).json({message: "Reset of 2FA successful"})
    } catch (error) {
        res.status(500).json({error: "Error in reseting", message: error})
    }
})

module.exports = router


// Base64 string to image
// 