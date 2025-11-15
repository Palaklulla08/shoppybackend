// server.js
// Entry point - config, routes, error handler and server start

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

const app = express();

// parse JSON bodies
app.use(express.json());

// connect to DB (uri from .env)
connectDB(process.env.MONGODB_URI);

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// simple health check
app.get("/", (req, res) => res.send("ShoppyGlobe API is running"));

// global error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

