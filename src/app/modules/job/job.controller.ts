import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { jobService } from "./job.service.js";

// --------
// add a job //
const addJob = catchAsync(async (req: Request, res: Response) => {
  const jobData = req.body;

  const newJob = await jobService.addJob(jobData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Job added successfully",
    data: newJob,
  });
});



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
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
};
