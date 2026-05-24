const mongoose = require('mongoose');
const config = require('../config/index')

const connectDB = async () => {
    try {
        await mongoose.connect(
            config.MONGO_URI
        );

        console.log('MongoDB Connected Successfully');

    } catch (error) {

        console.log(error);

    }

};
connectDB()
module.exports = connectDB;