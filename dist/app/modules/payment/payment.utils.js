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
exports.verifyPayment = exports.initiateAdvance = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(config_1.default.payment_url, {
        store_id: config_1.default.store_Id,
        tran_id: paymentData.transactionId,
        success_url: `https://bike-breeze.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success&coupon=${paymentData.coupon}`,
        fail_url: `https://bike-breeze.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=failed`,
        cancel_url: "https://bike-breeze-frontend.vercel.app/",
        amount: paymentData.amount,
        currency: "BDT",
        signature_key: config_1.default.signature_key,
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerAddress,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "Bangladesh",
        cus_phone: paymentData.customerPhone,
        type: "json",
    });
    return response.data;
});
exports.initiatePayment = initiatePayment;
const initiateAdvance = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(config_1.default.payment_url, {
        store_id: config_1.default.store_Id,
        tran_id: paymentData.transactionId,
        success_url: `https://bike-breeze.vercel.app/api/payment/advance/confirmation?transactionId=${paymentData.transactionId}&status=success`,
        fail_url: `https://bike-breeze.vercel.app/api/payment/advance/confirmation?transactionId=${paymentData.transactionId}&status=failed`,
        cancel_url: "https://bike-breeze-frontend.vercel.app/",
        amount: paymentData.amount,
        currency: "BDT",
        signature_key: config_1.default.signature_key,
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerAddress,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "Bangladesh",
        cus_phone: paymentData.customerPhone,
        type: "json",
    });
    return response.data;
});
exports.initiateAdvance = initiateAdvance;
const verifyPayment = (transId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(config_1.default.payment_verify_url, {
        params: {
            store_id: config_1.default.store_Id,
            signature_key: config_1.default.signature_key,
            type: "json",
            request_id: transId,
        },
    });
    return response.data;
});
exports.verifyPayment = verifyPayment;
