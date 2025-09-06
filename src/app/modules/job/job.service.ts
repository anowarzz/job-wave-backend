import { IJob } from "./job.interface.js";
import { Job } from "./job.model.js";

// Add a new Job //
const addJob = async (jobData: IJob) => {
  const newJob = await Job.create(jobData);
  return newJob;
};

export const jobService = {
  addJob,
};
