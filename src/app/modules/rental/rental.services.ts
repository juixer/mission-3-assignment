import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IRental } from "./rental.interface";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { Rental } from "./rental.model";
import { Bike } from "../bike/bike.model";
import { calculateTotalCost } from "./rental.utils";
import {
  initiateAdvance,
  initiatePayment,
  TPaymentData,
} from "../payment/payment.utils";
import { Coupon } from "../coupon/coupon.model";

const createRentalIntoDB = async (token: JwtPayload, payload: IRental) => {
  // destructing email from token
  const { email } = token;

  // finding user by email
  const user = await User.findOne({ email });

  // checking bike is exists
  const bike = await Bike.isBikeExists(payload?.bikeId);

  // if bike not exists throw app error
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike does not exist ");
  }

  // checking bike is available if not then throw error
  if (!bike?.isAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike not available right now");
  }

  const advance_transaction_Id = `TranId${Date.now()}`;

  // creating rental payload
  const rental: Partial<IRental> = {
    userId: user?._id,
    bikeId: payload?.bikeId,
    startTime: payload?.startTime,
    returnTime: payload?.returnTime,
    totalCost: payload?.totalCost,
    isReturned: payload?.isReturned,
    advance_transaction_Id: advance_transaction_Id,
  };

  // creating rental
  await Rental.create(rental);

  const paymentData = {
    transactionId: advance_transaction_Id,
    amount: 100,
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerAddress: user?.address,
  };

  const paymentSession = await initiateAdvance(paymentData as TPaymentData);
  return paymentSession;
};

const returnBikeWhichUpdateDB = async (
  id: string,
  payload: { rentalId: string; returnTime: string }
) => {
  // finding rental by id
  const rental = await Rental.findById(id);

  // if rental not found then throw app error
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found");
  }

  // checking rental bike return or not
  if (rental?.isReturned) {
    throw new AppError(httpStatus.BAD_REQUEST, "Bike already returned");
  }

  // finding bike by rental bike id
  const bike = await Bike.findById(rental?.bikeId);

  // sending startTime, currentTime/returnTime , pricePerHour to calculate total cost
  const totalCost = calculateTotalCost(
    rental?.startTime,
    payload?.returnTime,
    bike?.pricePerHour as number
  );

  // creating return bike payload
  const returnBike = {
    returnTime: payload?.returnTime,
    totalCost,
    isReturned: true,
  };

  // updating rental with return bike payload
  const result = await Rental.findByIdAndUpdate(id, returnBike, { new: true });

  // updating bike availability
  await Bike.findByIdAndUpdate(bike?._id, { isAvailable: true }, { new: true });
  return result;
};

const getAllRentalsOfUsersFromDB = async (token: JwtPayload) => {
  // destructing email from token
  const { email } = token;
  // finding user by email
  const user = await User.findOne({ email });

  // finding users all rentals and used populate
  const unpaidResult = await Rental.find({
    userId: user?._id,
    payment_status: "pending",
    isReturned: true,
  })
    .populate("userId")
    .populate("bikeId")
    .sort({ updatedAt: -1 });

  const paidResult = await Rental.find({
    userId: user?._id,
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
};

const getAllRentalsFromDB = async () => {
  const result = await Rental.find({ isReturned: false, advance_payment: true })
    .populate("userId")
    .populate("bikeId");
  return result;
};

const userPayForRent = async (id: string, query: Record<string, unknown>) => {
  const { coupon } = query;
  // finding rental by id
  const rentalData = await Rental.findById(id);

  // if rental not found then throw app error
  if (!rentalData) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found");
  }

  const couponData = await Coupon.findOne({ coupon });

  if (!couponData) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon is not valid");
  }

  // finding user by email
  const user = await User.findById(rentalData.userId);

  const transaction_Id = `TranId${Date.now()}`;

  await Rental.findByIdAndUpdate(id, { transaction_Id: transaction_Id });

  const paymentData = {
    transactionId: transaction_Id,
    amount: (rentalData.totalCost * couponData.percent) / 100,
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerAddress: user?.address,
    coupon,
  };

  const paymentSession = await initiatePayment(paymentData as TPaymentData);
  return paymentSession;
};

const userPayForRental = async (id: string) => {
  // finding rental by id
  const rentalData = await Rental.findById(id);

  // if rental not found then throw app error
  if (!rentalData) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found");
  }

  // finding user by email
  const user = await User.findById(rentalData.userId);

  const transaction_Id = `TranId${Date.now()}`;

  await Rental.findByIdAndUpdate(id, { transaction_Id: transaction_Id });

  const paymentData = {
    transactionId: transaction_Id,
    amount: rentalData.totalCost,
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerAddress: user?.address,
  };

  const paymentSession = await initiatePayment(paymentData as TPaymentData);
  return paymentSession;
};

export const RentalServices = {
  createRentalIntoDB,
  returnBikeWhichUpdateDB,
  getAllRentalsOfUsersFromDB,
  getAllRentalsFromDB,
  userPayForRent,
  userPayForRental
};
