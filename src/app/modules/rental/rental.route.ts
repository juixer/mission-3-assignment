import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { RentalValidation } from "./rental.validation";
import { RentalControllers } from "./rental.controller";

const router = express.Router();

router.post(
  "/",
  auth("admin", "user"),
  validateRequest(RentalValidation.createRentalValidationSchema),
  RentalControllers.createRental
);

router.put("/:id/return", auth("admin"), RentalControllers.returnBike);

export const RentalRoutes = router;
