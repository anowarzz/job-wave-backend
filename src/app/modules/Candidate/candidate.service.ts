// get candidate applications

import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { Application } from "../application/application.model.js";
import { Job, SavedJob } from "../job/job.model.js";

// get candidates applied jobs
export const getMyApplications = async (userId: string) => {
  const applications = await Application.find({
    candidate: userId,
  })
    .populate({
      path: "job",
      populate: {
        path: "recruiter",
        select: "name email",
      },
    })
    .populate("candidate", "name email")
    .sort({ createdAt: -1 });

  return applications;
};

// apply for a job
export const applyForJob = async (candidateId: string, jobId: string) => {
  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found");
  }

  // Check if candidate has already applied for this job
  const existingApplication = await Application.findOne({
    candidate: candidateId,
    job: jobId,
  });

  if (existingApplication) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You have already applied for this job"
    );
  }

  // Create the application
  const application = await Application.create({
    candidate: candidateId,
    job: jobId,
  });

  // Return populated application
  const populatedApplication = await Application.findById(
    application._id
  ).populate({
    path: "job",
    populate: {
      path: "recruiter",
      select: "name email",
    },
  });

  return populatedApplication;
};

// Save job for candidate
const saveJob = async (userId: string, jobId: string) => {
  // Check if job exists
  const jobExists = await Job.findById(jobId);
  if (!jobExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found");
  }

  // Check if job is already saved by user
  const existingSavedJob = await SavedJob.findOne({
    user: userId,
    job: jobId,
  });

  if (existingSavedJob) {
    throw new AppError(StatusCodes.CONFLICT, "Job is already saved");
  }

  // Create new saved job
  const savedJob = await SavedJob.create({
    user: userId,
    job: jobId,
  });

  // Return saved job with populated job details
  const populatedSavedJob = await SavedJob.findById(savedJob._id).populate({
    path: "job",
    populate: {
      path: "recruiter",
      select: "name email",
    },
  });

  return populatedSavedJob;
};

// Remove saved job for candidate
const removeSavedJob = async (userId: string, jobId: string) => {
  if (!jobId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Job ID is required");
  }

  const savedJob = await SavedJob.findOneAndDelete({
    user: userId,
    job: jobId,
  });

  if (!savedJob) {
    throw new AppError(StatusCodes.NOT_FOUND, "Saved job not found");
  }

  return savedJob;
};

// Get saved jobs for candidate
const getMySavedJobs = async (userId: string) => {
  const savedJobs = await SavedJob.find({ user: userId })
    .populate({
      path: "job",
      populate: {
        path: "recruiter",
        select: "name email",
      },
    })
    .sort({ createdAt: -1 });

  return savedJobs;
};

export const CandidateService = {
  getMyApplications,
  applyForJob,
  saveJob,
  removeSavedJob,
  getMySavedJobs,
};
