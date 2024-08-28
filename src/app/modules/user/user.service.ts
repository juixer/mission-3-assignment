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

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const email = query.email as string | undefined;
  const uQuery: Record<string, unknown> = {};

  if(email){
    uQuery.email = { $regex: new RegExp(email, 'i') };
  }
  // finding all users from DB and sort them by createdAt field in ascending order
  const result = await User.find(uQuery);
  return result;
};

const updateProfileIntoDB = async (token: JwtPayload, body: Partial<IUser>) => {
  // destructuring email from the token
  const { email } = token;

  // destructuring name, phone, address, password, role from the body
  const { name, phone, address, profile_picture } = body;

  // finding the profile from DB and updating the name, phone, address fields
  const result = await User.findOneAndUpdate(
    { email },
    {
      name: name,
      phone: phone,
      address: address,
      profile_picture: profile_picture,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

// promote user to admin
const userToAdminIntoDB = async (email: string) => {
  const result = await User.findOneAndUpdate(
    { email: email },
    { role: "admin" },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};
// demote user to admin
const adminToUserIntoDB = async (email: string) => {
  const result = await User.findOneAndUpdate(
    { email: email },
    { role: "user" },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};
// demote user to admin
const deleteUserFromDB = async (email: string) => {
  const result = await User.findOneAndDelete({ email: email });
  return result;
};

export const UserServices = {
  getProfileFromDB,
  updateProfileIntoDB,
  getAllUserFromDB,
  userToAdminIntoDB,
  adminToUserIntoDB,
  deleteUserFromDB,
};
