const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error!", error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;
    const product = new Product({
      name,
      price,
      image,
      category,
      description,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (err) {
    res.status(500).json({ message: "Server error!", error: err.message });
  }
};

module.exports = { getProducts, addProduct };
