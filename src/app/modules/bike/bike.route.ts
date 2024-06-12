import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BikeValidations } from "./bike.validation";
import { BikeControllers } from "./bike.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// creating bike route which can be used by admin
router.post(
  "/",
  auth("admin"),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike
);

// updating bike information route which can be used by admin
router.put(
  "/:id",
  auth("admin"),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike
);

// deleting bike route which can be used by admin
router.delete("/:id", auth("admin"), BikeControllers.deleteBike);

// getting all bike information route
router.get("/", BikeControllers.getAllBike);

export const BikeRoutes = router;
