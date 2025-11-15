// routes/auth.js
// Register and login routes

import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Min 6 characters")
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty()
  ],
  login
);

export default router;
