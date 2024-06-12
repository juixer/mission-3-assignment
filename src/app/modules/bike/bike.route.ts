import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BikeValidations } from "./bike.validation";
import { BikeControllers } from "./bike.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike
);

router.put(
  "/:id",
  auth("admin"),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike
);

router.delete("/:id", auth("admin"), BikeControllers.deleteBike);

router.get("/", auth("admin", "user"), BikeControllers.getAllBike);

export const BikeRoutes = router;
