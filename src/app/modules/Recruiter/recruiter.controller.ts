import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { recruiterService } from "./recruiter.service.js";

// Add a job
const addJob = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const recruiterId = decodedToken.userId;
  const jobData = req.body;

  // Add recruiter ID to job data
  jobData.recruiter = recruiterId;

  const newJob = await recruiterService.addJob(jobData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Job added successfully",
    data: newJob,
  });
});

// Get all jobs posted by the recruiter
const getMyPostedJobs = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const recruiterId = decodedToken.userId;

  const jobs = await recruiterService.getMyJobs(recruiterId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Jobs retrieved successfully",
    data: jobs,
  });
});

// Get all applications for a specific job
const getJobApplications = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const recruiterId = decodedToken.userId;
  const { jobId } = req.params;

  const result = await recruiterService.getJobApplications(
    recruiterId,
    jobId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job applications retrieved successfully",
    data: result,
  });
});

export const RecruiterController = {
  addJob,
  getMyPostedJobs,
  getJobApplications,
};
