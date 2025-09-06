import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { userServices } from "./user.service.js";

// create user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    const user = await userServices.createUser(userData);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  }
);

//  get user profile  //
const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;

    const user = await userServices.getMyProfile(decodedToken.userId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Profile Retrieved Successfully",
      data: user,
    });
  }
);

//  update a user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user as JwtPayload;
    const payload = req.body;

    // Only allow current user to update their own profile
    if (userId !== verifiedToken.userId) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "You are not allowed to update this user profile"
      );
    }

    const user = await userServices.updateUser(
      userId as string,
      payload,
      verifiedToken as JwtPayload
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

export const userController = {
  createUser,
  getMyProfile,
  updateUser,
};
