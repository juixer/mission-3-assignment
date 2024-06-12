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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking is user exists
    const user = yield user_model_1.User.isUserExist(payload.email);
    // if user exists then throw error that user already exists
    if (user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exists");
    }
    // create new user
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking is user exists
    const user = yield user_model_1.User.isUserExist(payload.email);
    // if user does not exists then throw error that email is not valid
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email is not valid");
    }
    // checking is password matched
    if (!(yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match");
    }
    // creating jwtPayload
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // creating access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire);
    // retrieving user data from DB
    const userData = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    return {
        accessToken,
        userData,
    };
});
exports.AuthServices = {
    createUserIntoDB,
    loginUser,
};
