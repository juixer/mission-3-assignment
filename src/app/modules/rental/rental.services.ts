import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IRental } from "./rental.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../user/user.model";
import { Rental } from "./rental.model";
import { Bike } from "../bike/bike.model";
import { calculateTotalCost } from "./rental.utils";

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

  // creating rental payload
  const rental: Partial<IRental> = {
    userId: user?._id,
    bikeId: payload?.bikeId,
    startTime: payload?.startTime,
    returnTime: payload?.returnTime,
    totalCost: payload?.totalCost,
    isReturned: payload?.isReturned,
  };

  // creating rental
  const result = await Rental.create(rental);

  // updating bike availability
  await Bike.findByIdAndUpdate(
    rental.bikeId,
    { isAvailable: false },
    { new: true }
  );
  return result;
};

const returnBikeWhichUpdateDB = async (id: string) => {
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

  // getting current time
  const currentTime = new Date();

  // sending startTime, currentTime/returnTime , pricePerHour to calculate total cost
  const totalCost = calculateTotalCost(
    rental?.startTime,
    currentTime,
    bike?.pricePerHour as number
  );

  // creating return bike payload
  const returnBike = {
    returnTime: currentTime,
    totalCost,
    isReturned: true,
  };

  // updating rental with return bike payload
  const result = await Rental.findByIdAndUpdate(id, returnBike, { new: true });

  // updating bike availability
  await Bike.findByIdAndUpdate(bike?._id, { isAvailable: true }, { new: true });
  return result;
};

const getAllRentalsOfUsers = async (token: JwtPayload) => {
  // destructing email from token
  const { email } = token;
  // finding user by email
  const user = await User.findOne({ email });

  // finding users all rentals and used populate
  const result = await Rental.find({ userId: user?._id })
    .populate("userId")
    .populate("bikeId")
    .sort({ updatedAt: -1 });

  return result;
};

export const RentalServices = {
  createRentalIntoDB,
  returnBikeWhichUpdateDB,
  getAllRentalsOfUsers,
};
