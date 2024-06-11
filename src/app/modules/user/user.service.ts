import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "./user.model";
const getProfileFromDB = async (token: string) => {
  if (!token) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to access this"
    );
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  const result = await User.findOne({ email });
  return result;
};

export const UserServices = {
  getProfileFromDB,
};
