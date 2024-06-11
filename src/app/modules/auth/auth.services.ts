import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { ILogin } from "./auth.inteface";

const createUserIntoDB = async (payload: IUser) => {
  const user = await User.isUserExist(payload.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const result = await User.create(payload);
  return result;
};



const loginUser = async (payload: ILogin) => {
  const user = await User.isUserExist(payload.email);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is not valid");
  }

  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }

  const result = await User.findOne({ email: payload?.email });
  return result;
};

export const AuthServices = {
  createUserIntoDB,
  loginUser
};
