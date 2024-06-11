import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    router: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
