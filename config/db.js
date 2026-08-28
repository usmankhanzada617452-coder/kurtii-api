const mongoose = require("mongoose");

// Ye function MongoDB Atlas se connection banata hai
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Serverless (Vercel) environment mein process.exit() na karo,
    // warna function crash ho jata hai. Error console mein dikh jayega.
  }
};

module.exports = connectDB;