import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IRental } from "./rental.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../user/user.model";
import { Rental } from "./rental.model";
import { Bike } from "../bike/bike.model";
import { calculateTotalCost } from "./rental.utils";

const createRentalIntoDB = async (token: string, payload: IRental) => {
  if (!token) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You have no access to this route"
    );
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.findOne({ email });

  const bike = await Bike.isBikeExists(payload?.bikeId);

  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike does not exist ");
  }

  if (!bike?.isAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike not available right now");
  }

  const rental: Partial<IRental> = {
    userId: user?._id,
    bikeId: payload?.bikeId,
    startTime: payload?.startTime,
    returnTime: payload?.returnTime,
    totalCost: payload?.totalCost,
    isReturned: payload?.isReturned,
  };

  const result = await Rental.create(rental);
  await Bike.findByIdAndUpdate(
    rental.bikeId,
    { isAvailable: false },
    { new: true }
  );
  return result;
};

const returnBikeWhichUpdateDB = async (id: string) => {
  const rental = await Rental.findById(id);

  if (rental?.isReturned) {
    throw new AppError(httpStatus.BAD_REQUEST, "Bike already returned");
  }

  const bike = await Bike.findById(rental?.bikeId);

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found");
  }

  const currentTime = new Date();

  const totalCost = calculateTotalCost(
    rental?.startTime,
    currentTime,
    bike?.pricePerHour as number
  );

  const returnBike = {
    returnTime: currentTime,
    totalCost,
    isReturned: true,
  };

  const result = await Rental.findByIdAndUpdate(id, returnBike, { new: true });
  await Bike.findByIdAndUpdate(bike?._id, { isAvailable: true }, { new: true });
  return result;
};

const getAllRentalsOfUsers = async (token: string) => {
  if (!token) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You have no access to this route"
    );
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const { email } = decoded;
  const user = await User.findOne({ email });

  const result = await Rental.find({ userId: user?._id })
    .populate("userId")
    .populate("bikeId");

  return result;
};

export const RentalServices = {
  createRentalIntoDB,
  returnBikeWhichUpdateDB,
  getAllRentalsOfUsers,
};
