require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// Atlas se connect karo
connectDB();

const app = express();

// Middleware
app.use(cors()); // frontend ko backend se baat karne dega
app.use(express.json()); // JSON data ko samajhne ke liye (form ka data)

// Test route - check karne ke liye server chal raha hai ya nahi
app.get("/", (req, res) => {
  res.send("Khan Collection API is running...");
});

// Sare routes yahan connect honge
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server chal raha hai port ${PORT} par`);
  });
}

module.exports = app;