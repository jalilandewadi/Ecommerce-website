const express = require("express");
const Checkout = require("../model/Checkout.model");
const Order = require("../model/Order.model");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

//@route POST /api/checkout
//@desc create a new checkour section
//@access private
router.post("/", protect, async (req, res) => {
    // console.log(req.body);   
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "no itmes in checkout " });
  }

  try {
    //create a new checout section
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(200).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session", error);
    res.status(500).json({ message: "Server error" });
  }
});

//@route PUT /api/checkout/:id/pay
//@desc Update checkout to mark as paid after successful payment
//@access private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkouut not found" });
    }
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//@route POST /api/checkout/:id/finalize
//@desc Finalize checkout and convert to an order after successful payment confirmation
//@access private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymenStatus: "paid",
        paymnetDetails: checkout.paymnetDetails,
      });

      //Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      //Delete the associated cart
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalize" });
    } else {
      res.status(400).json({ message: "Chekcout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
