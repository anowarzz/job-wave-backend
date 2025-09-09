import { Types } from "mongoose";
import { JobCategory } from "./job.constant.js";

export type TJobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship";

export type TJobStatus = "open" | "closed";

export interface IJob {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: JobCategory;
  recruiter?: Types.ObjectId;
  jobType: TJobType;
  requiredSkills: string[];
  location: string;
  status: TJobStatus;
  salaryRange: string;
  isFeatured?: boolean;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedJob {
  user: Types.ObjectId;
  job: Types.ObjectId;
}
