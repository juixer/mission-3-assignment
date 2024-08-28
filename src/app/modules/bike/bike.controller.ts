import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeServices } from "./bike.services";

const createBike = catchAsync(async (req, res) => {
  // creating a new bike into DB
  const result = await BikeServices.createBikeIntoDB(req.body);

  // Sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBike = catchAsync(async (req, res) => {
  const query = req.query;
  // retrieving all bikes from DB
  const result = await BikeServices.getAllBikeFromDB(query);

  // sending response
  sendResponse(res, {
    // if there is no data in DB then show no data message and if there is data it will show data
    statusCode: httpStatus.OK,
    success: true,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

const getSingleBike = catchAsync(async (req, res) => {
  // destructuring id from request params
  const { id } = req.params;

  // updating bike information into DB
  const result = await BikeServices.getSingleBikeFromDB(id);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike info retrieve successfully",
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  // destructuring id from request params
  const { id } = req.params;

  // updating bike information into DB
  const result = await BikeServices.updateBikeIntoDB(id, req.body);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  // destructuring id from request params
  const { id } = req.params;

  // deleting the bike from DB
  const result = await BikeServices.deleteBikeFromDB(id);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike deleted successfully",
    data: result,
  });
});

const getBikeBrand = catchAsync(async (req, res) => {
  const result = await BikeServices.getBikeBrandFromDB();
  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike brand retrieved successfully",
    data: result,
  });
});

const getAvailableBikes = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BikeServices.getAvailableBikesFromDB(query);
  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available bikes retrieved successfully",
    data: result,
  });
});

const searchBikes = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BikeServices.searchTermBike(query);
  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "searched bikes retrieved successfully",
    data: result,
  });
});

const getMostBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getMostRentedBikeFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Most rented bike retrieved successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
  getBikeBrand,
  getSingleBike,
  getAvailableBikes,
  getMostBikes,
  searchBikes
};
