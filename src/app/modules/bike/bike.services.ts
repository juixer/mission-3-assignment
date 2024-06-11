import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: IBike) => {
  const isBikeExists = await Bike.isBikeExists(payload.name);

  if (isBikeExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "This bike already exists");
  }

  const result = await Bike.create(payload);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
};
