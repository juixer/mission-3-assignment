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
exports.couponService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const coupon_model_1 = require("./coupon.model");
const createCouponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const couponCode = yield coupon_model_1.Coupon.findOne({ coupon: payload.coupon });
    if (couponCode) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Coupon already exists");
    }
    const result = yield coupon_model_1.Coupon.create(payload);
    return result;
});
const getAllCouponsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.find({});
    return result;
});
const disableCouponIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndUpdate(id, { isAvailable: false });
    return result;
});
const activeCouponIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndUpdate(id, { isAvailable: true });
    return result;
});
const deleteCouponFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndDelete(id);
    return result;
});
const getAvailableCouponsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.find({ isAvailable: true });
    return result;
});
exports.couponService = {
    createCouponIntoDB,
    getAllCouponsFromDB,
    disableCouponIntoDB,
    activeCouponIntoDB,
    deleteCouponFromDB,
    getAvailableCouponsFromDB
};
