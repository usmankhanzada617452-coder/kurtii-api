const mongoose = require("mongoose");
const dns = require("dns");

// Windows par kabhi kabhi Node.js ka DNS resolver SRV records resolve nahi kar pata
// isliye manually Google ka DNS server use karne ko bolte hain
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Ye function MongoDB Atlas se connection banata hai
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // connection fail ho to server band kar do
  }
};

module.exports = connectDB;