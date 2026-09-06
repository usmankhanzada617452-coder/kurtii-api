const express = require("express");
const router = express.Router();
const { subscribeEmail, getAllSubscribers } = require("../controllers/subscriberController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", subscribeEmail);
router.get("/", protect, adminOnly, getAllSubscribers);

module.exports = router;