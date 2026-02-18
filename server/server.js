const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cart.route");
const checkoutRoutes = require("./routes/checkout.route");
const orderRoutes = require("./routes/order.route");
const uploadRoutes = require("./routes/upload.routes");
const subscriberRoutes = require("./routes/subscriber.route");
const adminRoutes = require("./routes/admin.route");
const adminProductsRoute = require("./routes/productAdmin.routes");
const adminOrdersRoute = require("./routes/adminOrders.route");

const app = express();
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 9000;

//connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Rabbit!  ");
});

//  API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", adminProductsRoute);
app.use("/api/admin/orders", adminOrdersRoute );

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
