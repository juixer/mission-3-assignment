"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    coupon: {
        type: String,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
        default: 1,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});
exports.Coupon = (0, mongoose_1.model)("coupon", couponSchema);
