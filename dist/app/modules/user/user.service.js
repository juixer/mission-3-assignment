"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const getProfileFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring email from the token
    const { email } = token;
    // finding the profile from DB
    const result = yield user_model_1.User.findOne({ email });
    return result;
});
const updateProfileIntoDB = (token, body) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring email from the token
    const { email } = token;
    // destructuring name, phone, address, password, role from the body
    const { name, phone, address, password, role } = body;
    // user can not update password
    if (password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You can only update name, phone, address fields");
    }
    // user can not update role
    if (role) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You can only update name, phone, address fields");
    }
    // user can not update email
    if (body.email) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You can only update name, phone, address fields");
    }
    // finding the profile from DB and updating the name, phone, address fields
    const result = yield user_model_1.User.findOneAndUpdate({ email }, {
        name: name,
        phone: phone,
        address: address,
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.UserServices = {
    getProfileFromDB,
    updateProfileIntoDB,
};
