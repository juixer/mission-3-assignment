import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controllers";

const router = express.Router();



export const UserRoutes = router;
