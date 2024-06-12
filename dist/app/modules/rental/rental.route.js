"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const rental_validation_1 = require("./rental.validation");
const rental_controller_1 = require("./rental.controller");
const router = express_1.default.Router();
// create rental route which can be used by admin , user
router.post("/", (0, auth_1.default)("admin", "user"), (0, validateRequest_1.default)(rental_validation_1.RentalValidation.createRentalValidationSchema), rental_controller_1.RentalControllers.createRental);
// returning bike route which updates rental information can be used by admin
router.put("/:id/return", (0, auth_1.default)("admin"), rental_controller_1.RentalControllers.returnBike);
// rentals bike route for user/admin
router.get("/", (0, auth_1.default)("admin", "user"), rental_controller_1.RentalControllers.getAllRentals);
exports.RentalRoutes = router;
