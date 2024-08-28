import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: IBike) => {
  // creating bike into DB
  const result = await Bike.create(payload);
  return result;
};

const getAllBikeFromDB = async (query: Record<string, unknown>) => {
  const { name, brand } = query;
  const bQuery: Record<string, unknown> = {};

  if (name) {
    bQuery.name = { $regex: new RegExp(name as string, "i") };
  }
  if (brand) {
    bQuery.brand = { $regex: new RegExp(brand as string, "i") };
  }
  // finding all users from DB and sort them by createdAt field in ascending order
  const result = await Bike.find(bQuery);
  return result;
};

const getMostRentedBikeFromDB = async () => {
  // creating bike into DB
  const result = await Bike.find({ isAvailable: true })
    .sort({ rented: -1 })
    .limit(6);
  return result;
};

const getSingleBikeFromDB = async (id: string) => {
  // checking if bike exist
  const isBikeExist = await Bike.isBikeExists(id);

  // if bike does not exist then throw error
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike does not exist");
  }

  // updating bike information into DB
  const result = await Bike.findById(id);
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

const getBikeBrandFromDB = async () => {
  const result = Bike.find({}, { brand: 1, name: 1, _id: -1 });
  return result;
};

const searchTermBike = async (query: Record<string,unknown>) => {
  const { searchTerm } = query;
  const bQuery: Record<string, unknown> = { isAvailable: true };
  if (searchTerm) {
    bQuery.$or = [
      { name: { $regex: new RegExp(searchTerm as string, "i") } },
      { brand: { $regex: new RegExp(searchTerm as string, "i") } },
    ];
  }
  const result = await Bike.find(bQuery);
  return result;
};

const getAvailableBikesFromDB = async (query: Record<string, unknown>) => {
  const { name, brand } = query;
  const bQuery: Record<string, unknown> = { isAvailable: true };

  if (name) {
    bQuery.name = { $regex: new RegExp(name as string, "i") };
  }
  if (brand) {
    bQuery.brand = { $regex: new RegExp(brand as string, "i") };
  }

  const result = await Bike.find(bQuery);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
  getBikeBrandFromDB,
  getSingleBikeFromDB,
  getAvailableBikesFromDB,
  getMostRentedBikeFromDB,
  searchTermBike
};
