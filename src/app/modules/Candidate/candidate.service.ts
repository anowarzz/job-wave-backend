// get candidate applications

import { Application } from "../application/application.model.js";

// get candidates applied jobs
export const getMyApplications = async (userId: string) => {
  const applications = await Application.find({
    candidateId: userId,
  }).populate("job");
  return applications;
};

export const CandidateService = {
  getMyApplications,
};
