const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        const mongodbConnection = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected : ${mongodbConnection.connection.host}`)
    } catch (error) {
        console.log(`Database connection error ${error}`)
        process.exit(1);
    }
}

module.exports = dbConnect