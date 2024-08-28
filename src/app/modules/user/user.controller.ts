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

const getAllUsers = catchAsync(async (req, res) => {
  const query = req.query;
  // getting all users from database
  const result = await UserServices.getAllUserFromDB(query);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users retrieved successfully",
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

const userToAdmin = catchAsync(async (req, res) => {
  // updating user profile information into database
  const email = req.params.email;
  const result = await UserServices.userToAdminIntoDB(email);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User has been promoted to admin",
    data: result,
  });
});
const adminToUser = catchAsync(async (req, res) => {
  // updating user profile information into database
  const email = req.params.email;
  const result = await UserServices.adminToUserIntoDB(email);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin has been demoted to user",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  // deleting user profile information into database

  const email = req.params.email;
  const result = await UserServices.deleteUserFromDB(email);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserController = {
  getProfile,
  updateProfile,
  getAllUsers,
  adminToUser,
  userToAdmin,
  deleteUser,
};
