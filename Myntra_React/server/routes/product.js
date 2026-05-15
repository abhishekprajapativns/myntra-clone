const express = require("express");
const { getProducts, addProduct } = require("../controllers/productController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, addProduct);

module.exports = router;
