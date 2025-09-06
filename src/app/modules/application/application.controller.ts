import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { ApplicationService } from "./application.service.js";

// create application
const createApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const application = await ApplicationService.createApplication(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Application created successfully",
      data: application,
    });
  }
);

export const ApplicationController = {
  createApplication,
};
