"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const bike_validation_1 = require("./bike.validation");
const bike_controller_1 = require("./bike.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
// creating bike route which can be used by admin
router.post("/", (0, auth_1.default)("admin", "superAdmin"), (0, validateRequest_1.default)(bike_validation_1.BikeValidations.createBikeValidationSchema), bike_controller_1.BikeControllers.createBike);
router.get("/most-Rented", bike_controller_1.BikeControllers.getMostBikes);
// updating bike information route which can be used by admin
router.put("/:id", (0, auth_1.default)("admin", "superAdmin"), (0, validateRequest_1.default)(bike_validation_1.BikeValidations.updateBikeValidationSchema), bike_controller_1.BikeControllers.updateBike);
// deleting bike route which can be used by admin
router.delete("/:id", (0, auth_1.default)("admin", "superAdmin"), bike_controller_1.BikeControllers.deleteBike);
// getting all bike information route
router.get("/available-bikes", bike_controller_1.BikeControllers.getAvailableBikes);
router.get("/searchTerm-bikes", bike_controller_1.BikeControllers.searchBikes);
router.get("/all-bikes", bike_controller_1.BikeControllers.getAllBike);
router.get("/brands", bike_controller_1.BikeControllers.getBikeBrand);
router.get("/:id", bike_controller_1.BikeControllers.getSingleBike);
exports.BikeRoutes = router;
