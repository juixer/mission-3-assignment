"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
// get profile information
router.get("/me", (0, auth_1.default)("admin", "user"), user_controller_1.UserController.getProfile);
// update profile information
router.put("/me", (0, auth_1.default)("admin", "user"), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserValidationSchema), user_controller_1.UserController.updateProfile);
exports.UserRoutes = router;
