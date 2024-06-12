import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import { string } from "zod";
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
      "You have no access to this route"
    );
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  const { name, phone, address, password, role } = body;

  if (password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only update name, phone, address fields"
    );
  }
  if (role) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only update name, phone, address fields"
    );
  }
  if (body.email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only update name, phone, address fields"
    );
  }

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
