import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: IBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find().sort({ createdAt: -1 });
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<IBike>) => {
  const isBikeExist = await Bike.isBikeExists(id);

  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike does not exist");
  }

  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const isBikeExist = await Bike.isBikeExists(id);

  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike does not exist");
  }

  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
