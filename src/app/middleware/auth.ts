import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { TRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    // bearer token from authorization header in request headers
    const tokenHeaders = req.headers.authorization;

    // split the jwt token from bearer token
    const token = tokenHeaders?.split(" ")[1];

    // check if the token is valid or not
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    // decoding the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    // destructuring email, role
    const { email, role } = decoded;

    // check if the user exist or not
    const user = await User.isUserExist(email);

    // if user not exists throw error
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user does not exist");
    }

    // check if the user has the required role or not
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
