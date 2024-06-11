import express from "express";
import { UserController } from "./user.controllers";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/me", UserController.getProfile);
router.put(
  "/me",
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateProfile
);

export const UserRoutes = router;
