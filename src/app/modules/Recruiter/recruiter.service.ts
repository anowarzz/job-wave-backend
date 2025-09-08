import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError.js";
import { Application } from "../application/application.model.js";
import { IJob } from "../job/job.interface.js";
import { Job } from "../job/job.model.js";

// Add a new Job
const addJob = async (jobData: IJob) => {
  const newJob = await Job.create(jobData);
  return newJob;
};

// ----- Get all jobs posted by the  recruiter ------ //
const getMyJobs = async (recruiterId: string): Promise<IJob[]> => {
  const jobs = await Job.find({
    recruiterId,
  }).sort({ createdAt: -1 });

  return jobs;
};

// --------- Get all applications for a specific job ---------- //
const getJobApplications = async (recruiterId: string, jobId: string) => {
  //  verify that the job belongs to this recruiter
  const job = await Job.findOne({
    _id: jobId,
    recruiter: recruiterId,
  });

  if (!job) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Job not found or you don't have permission to view applications for this job"
    );
  }

  // Get all applications for  job with populated candidate data
  const applications = await Application.find({ job: jobId })
    .populate({
      path: "candidate",
      select: "name email",
    })
    .sort({ createdAt: -1 });

  return {
    job: {
      _id: job._id,
      title: job.title,
    },
    applications,
    totalApplications: applications.length,
  };
};

export const recruiterService = {
  addJob,
  getMyJobs,
  getJobApplications,
};
