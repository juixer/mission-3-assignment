import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const getProfile = catchAsync(async (req, res) => {
  const tokenHeaders = req.headers.authorization;

  const token = tokenHeaders?.split(" ")[1];
  const result = await UserServices.getProfileFromDB(token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const tokenHeaders = req.headers.authorization;

  const token = tokenHeaders?.split(" ")[1];
  const result = await UserServices.updateProfileIntoDB(
    token as string,
    req.body
  );
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
