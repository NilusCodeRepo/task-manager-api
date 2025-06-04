const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log("~~~~~~~~~~~~~~~~~~~~~~");
    console.log("DB Connection Established Successfully");
    console.log("~~~~~~~~~~~~~~~~~~~~~~");
  } catch (error) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~");
    console.log("DB Connection Error:", error.message);
    console.log("~~~~~~~~~~~~~~~~~~~~~~");

    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
