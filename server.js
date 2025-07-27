const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 8158;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve HTML/JS/CSS from root

// Razorpay config
const razorpay = new Razorpay({
  key_id: "rzp_test_kBKFbbuPBtup5u",
  key_secret: "ZsrQ8rNVHm8bO7VMBX5fT2pd",
});

// Payment route
app.post("/create-order", async (req, res) => {
  const { amount, currency = "INR", receipt = "receipt1" } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
      payment_capture: 1,
    });
    res.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

// 🚫 DO NOT include app.get("*", ...) — it causes crash in Node 18+
app.listen(PORT, () => {
  console.log(`✅ DenXWin server running at http://localhost:${PORT}`);
});
