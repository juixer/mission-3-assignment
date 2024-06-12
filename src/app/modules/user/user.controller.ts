import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const getProfile = catchAsync(async (req, res) => {
  // getting user profile information from database
  const result = await UserServices.getProfileFromDB(req.user);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  // updating user profile information into database
  const result = await UserServices.updateProfileIntoDB(req.user, req.body);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserController = {
  getProfile,
  updateProfile,
};
