const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", createOrder);
router.get("/my-orders", getMyOrders);
router.get("/", protect, adminOnly, getOrders);
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;