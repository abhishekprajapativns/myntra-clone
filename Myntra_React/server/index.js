const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product");

dotenv.config();

// To Connect Database
connectDB();

const app = express();

// For reading JSON data
app.use(express.json());

// To accept requests from the frontend
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
