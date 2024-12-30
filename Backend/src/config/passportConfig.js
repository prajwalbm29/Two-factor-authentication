const passport = require('passport')
const localStrategy = require('passport-local');
const User = require('../modals/user')
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    console.log("Inside serialization..")
    done(null, user._id);
})

passport.deserializeUser(async (_id, done) => {
    console.log("Inside deserialization..")
    try {
        const findUser = await User.findById(_id);
        if (!findUser) throw new Error("Unotherized user");
        done(null, findUser);
    } catch (error) {
        console.log(`Error in deserialze User : ${error}`);
        done(error, null);
    }
})

module.exports = passport.use(
    new localStrategy(
        {usernameField: "username", passwordField: "password"},
        async (username, password, done) => {
            try {
                console.log("Inside passport local..")
                const findUser = await User.findOne({username});
                if (!findUser) throw new Error("User not found");
                if (!await bcrypt.compare(password, findUser.password)) throw new Error("Invalid credentials");
                done(null, findUser);
            } catch (error) {
                console.log(`Error in local strategy : ${error}`);
                done(error, null);
            }
        }
))