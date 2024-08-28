"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("admin", "superAdmin", "user"), review_controller_1.reviewControllers.writeReview);
router.get("/verified", (0, auth_1.default)("admin", "superAdmin"), review_controller_1.reviewControllers.getVerifiedReviews);
router.get("/not-verified", (0, auth_1.default)("admin", "superAdmin"), review_controller_1.reviewControllers.getNotVerifiedReviews);
router.get("/latest", review_controller_1.reviewControllers.getLatestReviews);
router.put("/:id", (0, auth_1.default)("admin", "superAdmin"), review_controller_1.reviewControllers.verifyReview);
router.delete("/:id", (0, auth_1.default)("admin", "superAdmin"), review_controller_1.reviewControllers.deleteReview);
exports.reviewRoutes = router;
