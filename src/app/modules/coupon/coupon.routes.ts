import express from "express";
import auth from "../../middleware/auth";
import { couponController } from "./coupon.controller";

const router = express.Router();

router.post("/", auth("admin", "superAdmin"), couponController.createCoupon);
router.get("/", auth("admin", "superAdmin"), couponController.getAllCoupons);
router.put(
  "/disable/:id",
  auth("admin", "superAdmin"),
  couponController.disableCoupon
);
router.put(
  "/active/:id",
  auth("admin", "superAdmin"),
  couponController.activeCoupon
);
router.delete(
  "/:id",
  auth("admin", "superAdmin"),
  couponController.deleteCoupon
);

router.get("/available", couponController.getAvailableCoupons);

export const couponRoutes = router;
