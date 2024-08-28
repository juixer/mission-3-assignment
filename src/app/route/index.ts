import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BikeRoutes } from "../modules/bike/bike.route";
import { RentalRoutes } from "../modules/rental/rental.route";
import { paymentRoutes } from "../modules/payment/payment.route";
import { reviewRoutes } from "../modules/Review/review.route";
import { couponRoutes } from "../modules/coupon/coupon.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/users",
    router: UserRoutes,
  },
  {
    path: "/bikes",
    router: BikeRoutes,
  },
  {
    path: "/rentals",
    router: RentalRoutes,
  },
  {
    path: "/payment",
    router: paymentRoutes,
  },
  {
    path: "/reviews",
    router: reviewRoutes,
  },
  {
    path: "/coupons",
    router: couponRoutes,
  },
];

// using forEach loop to get moduleRoutes path and router
moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
