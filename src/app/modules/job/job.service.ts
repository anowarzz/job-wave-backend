import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { JobCategory } from "./job.constant.js";
import { IJob } from "./job.interface.js";
import { Job } from "./job.model.js";

// Get all jobs //
const getAllJobs = async () => {
  const jobs = await Job.find({ isDeleted: { $ne: true } }).populate(
    "recruiter",
    "-_id name email"
  );
  return jobs;
};

// Get job categories //
const getJobCategories = async () => {
  const categories = Object.values(JobCategory).map((category) => ({
    category,
    value: category,
  }));
  return categories;
};

// Get jobs by category //
const getJobsByCategory = async (category: string) => {
  if (!Object.values(JobCategory).includes(category as JobCategory)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid job category");
  }

  const jobs = await Job.find({ category }).populate(
    "recruiter",
    "-_id name email"
  );
  return jobs;
};

// Get job by ID //
const getJobById = async (jobId: string) => {
  if (!jobId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Job ID is required");
  }

  const job = await Job.findById(jobId).populate(
    "recruiter",
    "-_id name email"
  );

  if (!job) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found");
  }

  return job;
};

// Update job by ID
const updateJob = async (jobId: string, updateData: Partial<IJob>) => {
  if (!jobId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Job ID is required");
  }

  const jobToUpdate = await Job.findById(jobId);
  if (!jobToUpdate) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found");
  }

  const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
    new: true,
    runValidators: true,
  }).populate("recruiter", "-_id name email");

  return updatedJob;
};

export const jobService = {
  getAllJobs,
  getJobCategories,
  getJobsByCategory,
  getJobById,
  updateJob,
};
