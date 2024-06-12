import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

// user schema
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// pre hook from password hashing
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

// post hook for password empty field in response data
userSchema.post("save", function (doc, next) {
  doc.password = "";
  doc.isSelected("password");
  next();
});

// statics method for checking user exists
userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

// statics method for checking password match
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// User mongoose model
export const User = model<IUser, UserModel>("User", userSchema);
