// get candidate applications

import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { Application } from "../application/application.model.js";
import { Job } from "../job/job.model.js";

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
  const populatedApplication = await Application.findById(application._id)
    .populate({
      path: "job",
      populate: {
        path: "recruiter",
        select: "name email",
      },
    })

  return populatedApplication;
};

export const CandidateService = {
  getMyApplications,
  applyForJob,
};
