import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { RentalValidation } from "./rental.validation";
import { RentalControllers } from "./rental.controller";

const router = express.Router();

// create rental route which can be used by admin , user
router.post(
  "/",
  auth("admin", "user"),
  validateRequest(RentalValidation.createRentalValidationSchema),
  RentalControllers.createRental
);

// returning bike route which updates rental information can be used by admin
router.put("/:id/return", auth("admin"), RentalControllers.returnBike);

// rentals bike route for user/admin
router.get("/", auth("admin", "user"), RentalControllers.getAllRentals);

export const RentalRoutes = router;
