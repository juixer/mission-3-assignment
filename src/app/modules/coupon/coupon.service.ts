import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCoupon } from "./coupon.interface";
import { Coupon } from "./coupon.model";

const createCouponIntoDB = async (payload: Partial<TCoupon>) => {
  const couponCode = await Coupon.findOne({ coupon: payload.coupon });

  if (couponCode) {
    throw new AppError(httpStatus.BAD_REQUEST, "Coupon already exists");
  }
  const result = await Coupon.create(payload);
  return result;
};

const getAllCouponsFromDB = async () => {
  const result = await Coupon.find({});
  return result;
};

const disableCouponIntoDB = async (id: string) => {
  const result = await Coupon.findByIdAndUpdate(id, { isAvailable: false });
  return result;
};

const activeCouponIntoDB = async (id: string) => {
  const result = await Coupon.findByIdAndUpdate(id, { isAvailable: true });
  return result;
};

const deleteCouponFromDB = async (id: string) => {
  const result = await Coupon.findByIdAndDelete(id);
  return result;
};

const getAvailableCouponsFromDB = async () => {
  const result = await Coupon.find({ isAvailable: true });
  return result;
};

export const couponService = {
  createCouponIntoDB,
  getAllCouponsFromDB,
  disableCouponIntoDB,
  activeCouponIntoDB,
  deleteCouponFromDB,
  getAvailableCouponsFromDB
};
