import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { jobService } from "./job.service.js";

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

export const JobController = {
  addJob,
};
