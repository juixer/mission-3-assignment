import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: IBike) => {
  // creating bike into DB
  const result = await Bike.create(payload);
  return result;
};

const getAllBikeFromDB = async () => {
  // getting all bike from DB and storing them which created recently
  const result = await Bike.find().sort({ createdAt: -1 });
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<IBike>) => {
  // checking if bike exist
  const isBikeExist = await Bike.isBikeExists(id);

  // if bike does not exist then throw error
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike does not exist");
  }

  // updating bike information into DB
  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  // checking if bike exists
  const isBikeExist = await Bike.isBikeExists(id);

  // if bike does not exist then throw error
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike does not exist");
  }

  // deleting bike from DB
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
