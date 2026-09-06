const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", sendMessage);
router.get("/", protect, adminOnly, getAllMessages);

module.exports = router;