import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const createUser = catchAsync(async (req, res) => {
  // creating a new user
  const result = await AuthServices.createUserIntoDB(req.body);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const logIn = catchAsync(async (req, res) => {
  // logging in a user
  const result = await AuthServices.loginUser(req.body);

  // destructuring the user and token from return
  const { userData, accessToken } = result;

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: userData,
  });
});

export const AuthControllers = {
  createUser,
  logIn,
};
