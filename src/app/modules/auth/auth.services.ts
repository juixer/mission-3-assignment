import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { ILogin } from "./auth.inteface";
import { createToken } from "./auth.utils";
import config from "../../config";

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

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire as string
  );


  const userData = await User.findOne({ email: payload?.email });
  return {
    accessToken,
    userData,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
