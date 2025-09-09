import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { CandidateService } from "./candidate.service.js";

// Get User Own Applications
const getMyApplications = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const result = await CandidateService.getMyApplications(decodedToken.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Applications Retrieved Successfully",
    data: result,
  });
});

// Apply for a job
const applyForJob = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const { jobId } = req.params;

  const result = await CandidateService.applyForJob(
    decodedToken.userId,
    jobId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Application submitted successfully",
    data: result,
  });
});

// Save a job
const saveJob = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const { jobId } = req.params;

  const result = await CandidateService.saveJob(
    decodedToken.userId,
    jobId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Job saved successfully",
    data: result,
  });
});

// Remove saved job
const removeSavedJob = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const { jobId } = req.params;

  await CandidateService.removeSavedJob(decodedToken.userId, jobId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job removed from saved list successfully",
    data: null,
  });
});

// Get User Own Saved Jobs
const getMySavedJobs = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const result = await CandidateService.getMySavedJobs(decodedToken.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Saved Jobs Retrieved Successfully",
    data: result,
  });
});

export const candidateController = {
  getMyApplications,
  applyForJob,
  saveJob,
  removeSavedJob,
  getMySavedJobs,
};
