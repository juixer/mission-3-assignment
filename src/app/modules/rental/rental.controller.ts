import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalServices } from "./rental.services";

const createRental = catchAsync(async (req, res) => {
  // creating a new rental
  const result = await RentalServices.createRentalIntoDB(
    req.user,
    req.body
  );

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  // destructuring id from params
  const { id } = req.params;

  // updating the rental status into DB
  const result = await RentalServices.returnBikeWhichUpdateDB(id);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  // getting all the rentals of the user from DB
  const result = await RentalServices.getAllRentalsOfUsers(
    req.user
  );

  // sending response
  sendResponse(res, {
    // if there is no data in DB then show no data message and if there is data it will show data
    statusCode: !result.length ? httpStatus.NOT_FOUND : httpStatus.OK,
    success: !result.length ? false : true,
    message: !result.length
      ? "No Data Found"
      : "Rentals retrieved successfully",
    data: result,
  });
});

export const RentalControllers = {
  createRental,
  returnBike,
  getAllRentals,
};
