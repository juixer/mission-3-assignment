import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";

const router = express.Router();

// get profile information
router.get(
  "/me",
  auth("admin", "user", "superAdmin"),
  UserController.getProfile
);

// update profile information
router.put(
  "/me",
  auth("admin", "user", "superAdmin"),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateProfile
);

// getting all users
router.get("/all-users", auth("admin", "superAdmin"), UserController.getAllUsers);

// promote to admin
router.put(
  "/promote/:email",
  auth("admin", "superAdmin"),
  UserController.userToAdmin
);
router.put(
  "/demote/:email",
  auth("admin", "superAdmin"),
  UserController.adminToUser
);
router.delete(
  "/delete/:email",
  auth("admin", "superAdmin"),
  UserController.deleteUser
);

export const UserRoutes = router;
