// controllers/productController.js
// Simple product read endpoints

import Product from "../models/Product.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
