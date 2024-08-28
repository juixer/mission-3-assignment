"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const coupon_controller_1 = require("./coupon.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("admin", "superAdmin"), coupon_controller_1.couponController.createCoupon);
router.get("/", (0, auth_1.default)("admin", "superAdmin"), coupon_controller_1.couponController.getAllCoupons);
router.put("/disable/:id", (0, auth_1.default)("admin", "superAdmin"), coupon_controller_1.couponController.disableCoupon);
router.put("/active/:id", (0, auth_1.default)("admin", "superAdmin"), coupon_controller_1.couponController.activeCoupon);
router.delete("/:id", (0, auth_1.default)("admin", "superAdmin"), coupon_controller_1.couponController.deleteCoupon);
router.get("/available", coupon_controller_1.couponController.getAvailableCoupons);
exports.couponRoutes = router;
