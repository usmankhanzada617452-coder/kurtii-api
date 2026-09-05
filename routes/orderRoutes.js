const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/my-orders", getMyOrders);
router.patch("/:id/status", updateOrderStatus);

module.exports = router;