import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalServices } from "./rental.services";

const createRental = catchAsync(async (req, res) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader?.split(" ")[1];
  const result = await RentalServices.createRentalIntoDB(
    token as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RentalServices.returnBikeWhichUpdateDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});

export const RentalControllers = {
  createRental,
  returnBike,
};