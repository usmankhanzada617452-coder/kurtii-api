const Order = require("../models/Order");

// Naya order banao
// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { fullName, phone, address, city, items, totalAmount } = req.body;

    if (!fullName || !phone || !address || !city || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Sare fields zaroori hain",
      });
    }

    const order = await Order.create({
      fullName,
      phone,
      address,
      city,
      items,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Sare orders laao (Atlas se admin dekhega)
// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createOrder, getOrders };