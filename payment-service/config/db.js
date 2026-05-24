const mongoose = require("mongoose");
const config = require('./index')

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;