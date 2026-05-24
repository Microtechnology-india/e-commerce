const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config({ path: "../.env" });

const app = express();

app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});