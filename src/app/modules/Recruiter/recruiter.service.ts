import { IJob } from "../job/job.interface.js";
import { Job } from "../job/job.model.js";

// Get all jobs posted by the  recruiter
const getMyJobs = async (recruiterId: string): Promise<IJob[]> => {
  const jobs = await Job.find({
    recruiterId,
  }).sort({ createdAt: -1 });

  return jobs;
};

export const recruiterService = {
  getMyJobs,
};
