// seed/seedProducts.js
// Run: npm run seed
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Product from "../models/Product.js";

const products = [
  { name: "Blue T-Shirt", price: 299, description: "Comfortable cotton tee", stock: 20 },
  { name: "Formal Shirt", price: 899, description: "Slim fit formal shirt", stock: 10 },
  { name: "Running Shoes", price: 2499, description: "Lightweight sneakers", stock: 15 }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

run();
