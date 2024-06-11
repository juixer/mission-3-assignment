import { Model } from "mongoose";

export type TRole = "admin" | "user";
export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
