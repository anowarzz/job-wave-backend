import { Schema, model } from "mongoose";
import { JobCategory } from "./job.constant.js";
import { IJob, ISavedJob } from "./job.interface.js";

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      maxlength: [2000, "Job description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      enum: {
        values: Object.values(JobCategory),
        message: `Job category must be one of: ${Object.values(
          JobCategory
        ).join(", ")}`,
      },
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    jobType: {
      type: String,
      required: [true, "Job type is required"],
      trim: true,
      enum: {
        values: [
          "full-time",
          "part-time",
          "contract",
          "freelance",
          "internship",
        ],
        message:
          "Job type must be one of: full-time, part-time, contract, freelance, internship",
      },
    },

    requiredSkills: {
      type: [String],
      required: [true, "At least one skill is required"],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["open", "closed"],
        message: "Status must be either 'open' or 'closed'",
      },
      default: "open",
    },
    salaryRange: {
      type: String,
      required: [true, "Salary range is required"],
      trim: true,
      maxlength: [50, "Salary range cannot exceed 50 characters"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//  saved job schema

const savedJobSchema = new Schema<ISavedJob>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Job = model<IJob>("Job", jobSchema);

export const SavedJob = model<ISavedJob>("SavedJob", savedJobSchema);
