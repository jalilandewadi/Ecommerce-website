const express = require("express");

const router = express.Router();

const Subscriber = require("../model/subcriber.model");

//@route POST /api/subscribe
//@desc Hnadle newsletter subscription
//@access public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  }
  try {
    // check if email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ messgae: "Email is already subscribed" });
    }

    subscriber = new Subscriber({email})
    await subscriber.save();

    return res
      .status(201)
      .json({ message: "Successfully subscribed to neswletter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router