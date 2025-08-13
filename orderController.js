import orderModel from "../models/orderModel.js";

// compute amount on server to avoid trusting client blindly.
const computeAmount = (items, fallbackAmount) => {
  if (!Array.isArray(items) || !items.length) return fallbackAmount || 0;
  // Expect each item like { price: number, quantity: number }
  const safe = items.every(it => typeof it.price === "number" && typeof it.quantity === "number");
  return safe ? items.reduce((s, it) => s + it.price * it.quantity, 0) : (fallbackAmount || 0);
};

// COD
const placeOrder = async (req, res) => {
  try {
    const { items = [], amount, address } = req.body;
    const computed = computeAmount(items, amount);
    const order = await orderModel.create({
      userId: req.body.userId,            // set by auth middleware
      items,
      amount: computed,
      address,
      status: "Order Placed",
      paymentMethod: "cod",
      payment: false,                     // unpaid (COD)
      date: Date.now(),
    });
    res.json({ success: true, orderId: order._id, payment: order.payment, method: "cod" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to place COD order" });
  }
};

// DEMO bKash
const placeOrderbKash = async (req, res) => {
  try {
    const { items = [], amount, address } = req.body;
    const computed = computeAmount(items, amount);
    const order = await orderModel.create({
      userId: req.body.userId,
      items,
      amount: computed,
      address,
      status: "Order Placed",
      paymentMethod: "bkash",
      payment: true,                      // DEMO: mark as paid immediately
      date: Date.now(),
    });
    res.json({ success: true, orderId: order._id, payment: order.payment, method: "bkash" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to place bKash demo order" });
  }
};

// DEMO Nagad
const placeOrdernagad = async (req, res) => {
  try {
    const { items = [], amount, address } = req.body;
    const computed = computeAmount(items, amount);
    const order = await orderModel.create({
      userId: req.body.userId,
      items,
      amount: computed,
      address,
      status: "Order Placed",
      paymentMethod: "nagad",
      payment: true,                      // DEMO: mark as paid immediately
      date: Date.now(),
    });
    res.json({ success: true, orderId: order._id, payment: order.payment, method: "nagad" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to place Nagad demo order" });
  }
};

// Admin: list all
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// User: my orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
};

// Admin: update status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

export { placeOrder, placeOrderbKash, placeOrdernagad, allOrders, userOrders, updateStatus };
