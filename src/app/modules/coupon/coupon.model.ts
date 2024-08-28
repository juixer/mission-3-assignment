import { model, Schema } from "mongoose";
import { TCoupon } from "./coupon.interface";

const couponSchema = new Schema<TCoupon>({
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

export const Coupon = model<TCoupon>("coupon", couponSchema);
