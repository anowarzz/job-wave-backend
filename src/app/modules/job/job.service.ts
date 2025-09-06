import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { IJob } from "./job.interface.js";
import { Job } from "./job.model.js";

// Add a new Job //
const addJob = async (jobData: IJob) => {
  const newJob = await Job.create(jobData);
  return newJob;
};

// Get all jobs //
const getAllJobs = async () => {
  const jobs = await Job.find().populate("recruiterId", "name email");
  return jobs;
};

// Get job by ID //
const getJobById = async (jobId: string) => {
  if (!jobId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Job ID is required");
  }

  const job = await Job.findById(jobId).populate("recruiterId", "name email");

  if (!job) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found");
  }

  return job;
};

export const jobService = {
  addJob,
  getAllJobs,
  getJobById,
};
