import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
const router = express.Router();

// signup route
router.post(
  "/signup",
  validateRequest(UserValidation.createUserValidationSchema),
  AuthControllers.createUser
);

// login route
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.logIn
);

export const AuthRoutes = router;
