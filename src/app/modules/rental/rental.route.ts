import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { RentalValidation } from "./rental.validation";
import { RentalControllers } from "./rental.controller";

const router = express.Router();

// create rental route which can be used by admin , user
router.post(
  "/",
  auth("admin", "user", "superAdmin"),
  validateRequest(RentalValidation.createRentalValidationSchema),
  RentalControllers.createRental
);

// returning bike route which updates rental information can be used by admin
router.put("/:id/return", auth("admin", "superAdmin"), RentalControllers.returnBike);

// rentals bike route for user/admin
router.get("/", auth("admin", "user", "superAdmin"), RentalControllers.getAllRentalsOfUsers);

//get all rentals bike route for admin
router.get("/all-rentals", auth("admin","superAdmin"), RentalControllers.getAllRentals);

router.put('/:id/coupon',auth("admin","user","superAdmin"), RentalControllers.userPayForRent)
router.put('/:id/payment',auth("admin","user","superAdmin"), RentalControllers.userPayForRental)



export const RentalRoutes = router;
