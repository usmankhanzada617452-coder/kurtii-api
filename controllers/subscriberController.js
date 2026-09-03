const Subscriber = require("../models/Subscriber");

// POST /api/subscribe
const subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email zaroori hai",
      });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Ye email pehle se subscribed hai",
      });
    }

    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: subscriber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { subscribeEmail };