import { Types } from "mongoose";

export type TJobType =
   "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship";

export type TJobStatus = "open" | "closed";

export interface IJob {
  _id: Types.ObjectId;
  title: string;
  description: string;
  recruiter?: Types.ObjectId;
  jobType: TJobType;
  requiredSkills: string[];
  location: string;
  status: TJobStatus;
  salaryRange: string;
  createdAt: Date;
  updatedAt: Date;
}
