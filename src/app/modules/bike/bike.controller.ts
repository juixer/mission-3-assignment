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
  // retrieving all bikes from DB
  const result = await BikeServices.getAllBikeFromDB();

  // sending response
  sendResponse(res, {
    // if there is no data in DB then show no data message and if there is data it will show data
    statusCode: !result.length ? httpStatus.NOT_FOUND : httpStatus.OK,
    success: !result.length ? false : true,
    message: !result.length ? "No Data Found" : "Bikes retrieved successfully",
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

export const BikeControllers = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
};
