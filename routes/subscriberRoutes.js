const express = require("express");
const router = express.Router();
const { subscribeEmail } = require("../controllers/subscriberController");

router.post("/", subscribeEmail);

module.exports = router;