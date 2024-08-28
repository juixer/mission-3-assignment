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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const bike_model_1 = require("../bike/bike.model");
const coupon_model_1 = require("../coupon/coupon.model");
const rental_model_1 = require("../rental/rental.model");
const payment_utils_1 = require("./payment.utils");
const confirmationAdvanceService = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    let result;
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        const rentalInfo = yield rental_model_1.Rental.findOne({
            advance_transaction_Id: transactionId,
        });
        yield rental_model_1.Rental.findOneAndUpdate({
            advance_transaction_Id: transactionId,
        }, { advance_payment: true }, { new: true });
        const { bikeId } = rentalInfo;
        result = yield bike_model_1.Bike.findByIdAndUpdate(bikeId, { isAvailable: false }, { new: true });
    }
    return result;
});
const confirmationPaymentService = (transactionId, coupon) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    let result;
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        result = yield rental_model_1.Rental.findOneAndUpdate({
            transaction_Id: transactionId,
        }, { payment_status: "paid" }, { new: true });
        const rentalInfo = yield rental_model_1.Rental.findOne({ transaction_Id: transactionId });
        yield coupon_model_1.Coupon.findOneAndUpdate({ coupon }, { isAvailable: false });
        yield bike_model_1.Bike.findByIdAndUpdate(rentalInfo === null || rentalInfo === void 0 ? void 0 : rentalInfo.bikeId, { $inc: { rented: 1 } }, { new: true });
    }
    return result;
});
exports.paymentServices = {
    confirmationAdvanceService,
    confirmationPaymentService,
};
