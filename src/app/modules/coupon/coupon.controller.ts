import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { couponService } from "./coupon.service";

const createCoupon = catchAsync(async (req, res) => {
  const result = await couponService.createCouponIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon created successfully",
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await couponService.getAllCouponsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon retrieved successfully",
    data: result,
  });
});

const disableCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await couponService.disableCouponIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon disabled successfully",
    data: result,
  });
});

const activeCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await couponService.activeCouponIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon activated successfully",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await couponService.deleteCouponFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon activated successfully",
    data: result,
  });
});

const getAvailableCoupons = catchAsync(async (req, res) => {
  const result = await couponService.getAvailableCouponsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon retrieved successfully",
    data: result,
  });
});

export const couponController = {
  createCoupon,
  getAllCoupons,
  disableCoupon,
  activeCoupon,
  deleteCoupon,
  getAvailableCoupons,
};
