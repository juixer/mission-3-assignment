import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";

const router = express.Router();

// get profile information
router.get("/me", auth("admin", "user"), UserController.getProfile);

// update profile information
router.put(
  "/me",
  auth("admin", "user"),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateProfile
);

export const UserRoutes = router;
