import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalServices } from "./rental.services";

const createRental = catchAsync(async (req, res) => {
  // creating a new rental
  const result = await RentalServices.createRentalIntoDB(req.user, req.body);

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
  const result = await RentalServices.returnBikeWhichUpdateDB(id, req.body);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});

const getAllRentalsOfUsers = catchAsync(async (req, res) => {
  // getting all the rentals of the user from DB
  const result = await RentalServices.getAllRentalsOfUsersFromDB(req.user);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  // getting all the rentals of the user from DB
  const result = await RentalServices.getAllRentalsFromDB();

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

const userPayForRent = catchAsync(async(req,res) => {
  // destructuring id from params
  const { id } = req.params;
  const result = await RentalServices.userPayForRent(id, req.query);

   // sending response
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment process ongoing",
    data: result,
  });
})

const userPayForRental = catchAsync(async(req,res) => {
  // destructuring id from params
  const { id } = req.params;
  const result = await RentalServices.userPayForRental(id);

   // sending response
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment process ongoing",
    data: result,
  });
})

export const RentalControllers = {
  createRental,
  returnBike,
  getAllRentalsOfUsers,
  getAllRentals,
  userPayForRent,
  userPayForRental
};
