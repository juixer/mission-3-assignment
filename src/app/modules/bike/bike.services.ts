import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: IBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB
};
