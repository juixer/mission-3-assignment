import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BikeValidations } from "./bike.validation";
import { BikeControllers } from "./bike.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// creating bike route which can be used by admin
router.post(
  "/",
  auth("admin", "superAdmin"),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike
);
router.get("/most-Rented", BikeControllers.getMostBikes);

// updating bike information route which can be used by admin
router.put(
  "/:id",
  auth("admin", "superAdmin"),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike
);

// deleting bike route which can be used by admin
router.delete("/:id", auth("admin", "superAdmin"), BikeControllers.deleteBike);

// getting all bike information route
router.get("/available-bikes", BikeControllers.getAvailableBikes);
router.get("/searchTerm-bikes", BikeControllers.searchBikes);
router.get("/all-bikes", BikeControllers.getAllBike);
router.get("/brands", BikeControllers.getBikeBrand);
router.get("/:id", BikeControllers.getSingleBike);


export const BikeRoutes = router;
