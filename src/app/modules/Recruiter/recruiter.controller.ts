import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { recruiterService } from "./recruiter.service.js";

// Get all jobs posted by the authenticated recruiter
const getMyJobs = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const recruiterId = decodedToken.userId;

  const jobs = await recruiterService.getMyJobs(recruiterId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Jobs retrieved successfully",
    data: jobs,
  });
});

export const RecruiterController = {
  getMyJobs,
};
