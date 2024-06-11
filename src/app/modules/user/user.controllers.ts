import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const getProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.getProfileFromDB(token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getProfile,
};
