import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/appError.js";
import { User } from "../modules/user/user.model.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken || req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Access Token Found");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      //  check if user exist with this email
      const isUserExist = await User.findOne({
        email: verifiedToken.email,
      });

      if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No Logged In User Found");
      }

      // user status check
      if (isUserExist.isBlocked) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          `This user is Blocked. cannot proceed with the request`
        );
      }

      if (isUserExist.isDeleted) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "This user account is Deleted"
        );
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          403,
          `Unauthorized access. Only ${authRoles.join(
            ", "
          )} can access this route`
        );
      }

      req.user = verifiedToken;

      next();
    } catch (error) {
      next(error);
    }
  };
