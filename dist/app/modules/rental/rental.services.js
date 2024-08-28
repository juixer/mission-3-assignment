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
exports.RentalServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const rental_model_1 = require("./rental.model");
const bike_model_1 = require("../bike/bike.model");
const rental_utils_1 = require("./rental.utils");
const payment_utils_1 = require("../payment/payment.utils");
const coupon_model_1 = require("../coupon/coupon.model");
const createRentalIntoDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // destructing email from token
    const { email } = token;
    // finding user by email
    const user = yield user_model_1.User.findOne({ email });
    // checking bike is exists
    const bike = yield bike_model_1.Bike.isBikeExists(payload === null || payload === void 0 ? void 0 : payload.bikeId);
    // if bike not exists throw app error
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Bike does not exist ");
    }
    // checking bike is available if not then throw error
    if (!(bike === null || bike === void 0 ? void 0 : bike.isAvailable)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Bike not available right now");
    }
    const advance_transaction_Id = `TranId${Date.now()}`;
    // creating rental payload
    const rental = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        bikeId: payload === null || payload === void 0 ? void 0 : payload.bikeId,
        startTime: payload === null || payload === void 0 ? void 0 : payload.startTime,
        returnTime: payload === null || payload === void 0 ? void 0 : payload.returnTime,
        totalCost: payload === null || payload === void 0 ? void 0 : payload.totalCost,
        isReturned: payload === null || payload === void 0 ? void 0 : payload.isReturned,
        advance_transaction_Id: advance_transaction_Id,
    };
    // creating rental
    yield rental_model_1.Rental.create(rental);
    const paymentData = {
        transactionId: advance_transaction_Id,
        amount: 100,
        customerName: user === null || user === void 0 ? void 0 : user.name,
        customerEmail: user === null || user === void 0 ? void 0 : user.email,
        customerPhone: user === null || user === void 0 ? void 0 : user.phone,
        customerAddress: user === null || user === void 0 ? void 0 : user.address,
    };
    const paymentSession = yield (0, payment_utils_1.initiateAdvance)(paymentData);
    return paymentSession;
});
const returnBikeWhichUpdateDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // finding rental by id
    const rental = yield rental_model_1.Rental.findById(id);
    // if rental not found then throw app error
    if (!rental) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Rental not found");
    }
    // checking rental bike return or not
    if (rental === null || rental === void 0 ? void 0 : rental.isReturned) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Bike already returned");
    }
    // finding bike by rental bike id
    const bike = yield bike_model_1.Bike.findById(rental === null || rental === void 0 ? void 0 : rental.bikeId);
    // sending startTime, currentTime/returnTime , pricePerHour to calculate total cost
    const totalCost = (0, rental_utils_1.calculateTotalCost)(rental === null || rental === void 0 ? void 0 : rental.startTime, payload === null || payload === void 0 ? void 0 : payload.returnTime, bike === null || bike === void 0 ? void 0 : bike.pricePerHour);
    // creating return bike payload
    const returnBike = {
        returnTime: payload === null || payload === void 0 ? void 0 : payload.returnTime,
        totalCost,
        isReturned: true,
    };
    // updating rental with return bike payload
    const result = yield rental_model_1.Rental.findByIdAndUpdate(id, returnBike, { new: true });
    // updating bike availability
    yield bike_model_1.Bike.findByIdAndUpdate(bike === null || bike === void 0 ? void 0 : bike._id, { isAvailable: true }, { new: true });
    return result;
});
const getAllRentalsOfUsersFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // destructing email from token
    const { email } = token;
    // finding user by email
    const user = yield user_model_1.User.findOne({ email });
    // finding users all rentals and used populate
    const unpaidResult = yield rental_model_1.Rental.find({
        userId: user === null || user === void 0 ? void 0 : user._id,
        payment_status: "pending",
        isReturned: true,
    })
        .populate("userId")
        .populate("bikeId")
        .sort({ updatedAt: -1 });
    const paidResult = yield rental_model_1.Rental.find({
        userId: user === null || user === void 0 ? void 0 : user._id,
        payment_status: "paid",
    })
        .populate("userId")
        .populate("bikeId")
        .sort({ updatedAt: -1 });
    const result = {
        unpaidResult,
        paidResult,
    };
    return result;
});
const getAllRentalsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rental_model_1.Rental.find({ isReturned: false, advance_payment: true })
        .populate("userId")
        .populate("bikeId");
    return result;
});
const userPayForRent = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { coupon } = query;
    // finding rental by id
    const rentalData = yield rental_model_1.Rental.findById(id);
    // if rental not found then throw app error
    if (!rentalData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Rental not found");
    }
    const couponData = yield coupon_model_1.Coupon.findOne({ coupon });
    if (!couponData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Coupon is not valid");
    }
    // finding user by email
    const user = yield user_model_1.User.findById(rentalData.userId);
    const transaction_Id = `TranId${Date.now()}`;
    yield rental_model_1.Rental.findByIdAndUpdate(id, { transaction_Id: transaction_Id });
    const paymentData = {
        transactionId: transaction_Id,
        amount: (rentalData.totalCost * couponData.percent) / 100,
        customerName: user === null || user === void 0 ? void 0 : user.name,
        customerEmail: user === null || user === void 0 ? void 0 : user.email,
        customerPhone: user === null || user === void 0 ? void 0 : user.phone,
        customerAddress: user === null || user === void 0 ? void 0 : user.address,
        coupon,
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    return paymentSession;
});
const userPayForRental = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // finding rental by id
    const rentalData = yield rental_model_1.Rental.findById(id);
    // if rental not found then throw app error
    if (!rentalData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Rental not found");
    }
    // finding user by email
    const user = yield user_model_1.User.findById(rentalData.userId);
    const transaction_Id = `TranId${Date.now()}`;
    yield rental_model_1.Rental.findByIdAndUpdate(id, { transaction_Id: transaction_Id });
    const paymentData = {
        transactionId: transaction_Id,
        amount: rentalData.totalCost,
        customerName: user === null || user === void 0 ? void 0 : user.name,
        customerEmail: user === null || user === void 0 ? void 0 : user.email,
        customerPhone: user === null || user === void 0 ? void 0 : user.phone,
        customerAddress: user === null || user === void 0 ? void 0 : user.address,
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    return paymentSession;
});
exports.RentalServices = {
    createRentalIntoDB,
    returnBikeWhichUpdateDB,
    getAllRentalsOfUsersFromDB,
    getAllRentalsFromDB,
    userPayForRent,
    userPayForRental
};
