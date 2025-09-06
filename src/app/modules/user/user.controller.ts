import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse.js";
import { catchAsync } from "./../../utils/catchAsynct.js";
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

export { createUser };

export const userController = {
  createUser,
};
