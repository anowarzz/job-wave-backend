import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { jobService } from "./job.service.js";

//-----
// get all jobs //
const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const jobs = await jobService.getAllJobs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Jobs retrieved successfully",
    data: jobs,
  });
});

//-----
// get job categories //
const getJobCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await jobService.getJobCategories();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job categories retrieved successfully",
    data: categories,
  });
});

//-----
// get jobs by category //
const getJobsByCategory = catchAsync(async (req: Request, res: Response) => {
  const { category } = req.params;
  const jobs = await jobService.getJobsByCategory(category as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Jobs in ${category} category retrieved successfully`,
    data: jobs,
  });
});

// -----
// get job by ID //
const getJobById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await jobService.getJobById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job retrieved successfully",
    data: job,
  });
});

// -------
// Update job by ID //
const updateJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedJob = await jobService.updateJob(id as string, updateData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job updated successfully",
    data: updatedJob,
  });
});

export const JobController = {
  getAllJobs,
  getJobCategories,
  getJobsByCategory,
  getJobById,
  updateJob,
};
