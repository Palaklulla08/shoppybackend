// controllers/cartController.js
// Add/update/remove cart items for logged-in users

import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import { validationResult } from "express-validator";

// Add to cart
export const addToCart = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity) return res.status(400).json({ message: "Not enough stock" });

    let item = await CartItem.findOne({ user: req.user._id, product: productId });
    if (item) {
      item.quantity += quantity;
      await item.save();
      return res.json(item);
    }

    item = new CartItem({ user: req.user._id, product: productId, quantity });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// Get user's cart items
export const getUserCart = async (req, res, next) => {
  try {
    const items = await CartItem.find({ user: req.user._id }).populate("product");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: "Quantity must be integer >= 1" });

    const item = await CartItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    const product = await Product.findById(item.product);
    if (product.stock < quantity) return res.status(400).json({ message: "Not enough stock" });

    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// Remove cart item
export const removeCartItem = async (req, res, next) => {
  try {
    const item = await CartItem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Item removed", item });
  } catch (err) {
    next(err);
  }
};
