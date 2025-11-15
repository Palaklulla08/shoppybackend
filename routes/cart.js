// routes/cart.js
// Protected cart routes

import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/authMiddleware.js";
import { addToCart, getUserCart, updateCartItem, removeCartItem } from "../controllers/cartController.js";

const router = Router();

router.use(auth); // protect all routes below

router.post(
  "/",
  [
    body("productId").notEmpty().withMessage("productId required"),
    body("quantity").isInt({ min: 1 }).withMessage("quantity must be >=1")
  ],
  addToCart
);

router.get("/", getUserCart);

router.put("/:id",
  [ body("quantity").isInt({ min: 1 }).withMessage("quantity must be >=1") ],
  updateCartItem
);

router.delete("/:id", removeCartItem);

export default router;
