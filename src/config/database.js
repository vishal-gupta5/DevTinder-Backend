const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

module.exports = connectDB;
