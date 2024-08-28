"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const bike_route_1 = require("../modules/bike/bike.route");
const rental_route_1 = require("../modules/rental/rental.route");
const payment_route_1 = require("../modules/payment/payment.route");
const review_route_1 = require("../modules/Review/review.route");
const coupon_routes_1 = require("../modules/coupon/coupon.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        router: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        router: user_route_1.UserRoutes,
    },
    {
        path: "/bikes",
        router: bike_route_1.BikeRoutes,
    },
    {
        path: "/rentals",
        router: rental_route_1.RentalRoutes,
    },
    {
        path: "/payment",
        router: payment_route_1.paymentRoutes,
    },
    {
        path: "/reviews",
        router: review_route_1.reviewRoutes,
    },
    {
        path: "/coupons",
        router: coupon_routes_1.couponRoutes,
    },
];
// using forEach loop to get moduleRoutes path and router
moduleRoutes.forEach((route) => router.use(route.path, route.router));
exports.default = router;
