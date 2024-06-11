import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "./user.model";
import { IUser } from "./user.interface";
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

const updateProfileIntoDB = async (token: string, body: Partial<IUser>) => {
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

  const { name, phone, address } = body;

  const result = await User.findOneAndUpdate(
    { email },
    {
      name: name,
      phone: phone,
      address: address,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const UserServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
