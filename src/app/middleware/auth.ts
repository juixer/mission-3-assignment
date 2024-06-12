import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { TRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const tokenHeaders = req.headers.authorization;

    const token = tokenHeaders?.split(" ")[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.isUserExist(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user does not exist");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
