/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

// role interface
export type TRole = "admin" | "user" | "superAdmin";

// user interface
export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
  profile_picture: string;
}

// extending user interface for using statics methods
export interface UserModel extends Model<IUser> {
  // user exists
  isUserExist(email: string): Promise<IUser>;

  // password match
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
