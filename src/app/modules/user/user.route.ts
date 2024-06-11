import express from "express";
import { UserController } from "./user.controllers";

const router = express.Router();

router.get("/me", UserController.getProfile);

export const UserRoutes = router;
