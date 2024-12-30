const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const authRoutes = require('./routes/authRoutes')

dotenv.config();
dbConnect();

const app = express();

// Middlewares
const corsOptions = {
    origin: ["http://localhost:3001"],
    credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60 // 1 hour
    },
}))
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Listening to port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})