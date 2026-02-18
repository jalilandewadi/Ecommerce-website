const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MOngoose connected Successfully");
  } catch (e) {
    console.error("Mongo connection failed", e);
    process.exit(1);
  }
};

module.exports = connectDB;
