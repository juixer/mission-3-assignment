import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BikeRoutes } from "../modules/bike/bike.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
