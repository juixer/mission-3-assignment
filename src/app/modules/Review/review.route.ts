import express from "express";
import auth from "../../middleware/auth";
import { reviewControllers } from "./review.controller";

const router = express.Router();

router.post(
  "/",
  auth("admin", "superAdmin", "user"),
  reviewControllers.writeReview
);


router.get(
  "/verified",
  auth("admin", "superAdmin"),
  reviewControllers.getVerifiedReviews
);

router.get(
  "/not-verified",
  auth("admin", "superAdmin"),
  reviewControllers.getNotVerifiedReviews
);

router.get("/latest", reviewControllers.getLatestReviews);

router.put("/:id", auth("admin", "superAdmin"), reviewControllers.verifyReview);

router.delete(
  "/:id",
  auth("admin", "superAdmin"),
  reviewControllers.deleteReview
);

export const reviewRoutes = router;
