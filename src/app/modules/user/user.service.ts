import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import { IUser } from "./user.interface";
const getProfileFromDB = async (token: JwtPayload) => {
  // destructuring email from the token
  const { email } = token;

  // finding the profile from DB
  const result = await User.findOne({ email });
  return result;
};

const updateProfileIntoDB = async (token: JwtPayload, body: Partial<IUser>) => {
  // destructuring email from the token
  const { email } = token;

  // destructuring name, phone, address, password, role from the body
  const { name, phone, address, password, role } = body;

  // user can not update password
  if (password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only update name, phone, address fields"
    );
  }

  // user can not update role
  if (role) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only update name, phone, address fields"
    );
  }

  // user can not update email
  if (body.email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only update name, phone, address fields"
    );
  }

  // finding the profile from DB and updating the name, phone, address fields
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
