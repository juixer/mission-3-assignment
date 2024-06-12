import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { ILogin } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const createUserIntoDB = async (payload: IUser) => {
  // checking is user exists
  const user = await User.isUserExist(payload.email);

  // if user exists then throw error that user already exists
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  // create new user
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILogin) => {
  // checking is user exists
  const user = await User.isUserExist(payload.email);

  // if user does not exists then throw error that email is not valid
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is not valid");
  }

  // checking is password matched
  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }

  // creating jwtPayload
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // creating access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire as string
  );

  // retrieving user data from DB
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
