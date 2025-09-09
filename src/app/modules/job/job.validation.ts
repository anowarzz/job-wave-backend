import { z } from "zod";
import { JobCategory } from "./job.constant.js";

// job creation validation schema
export const createJobValidationSchema = z.object({
  title: z
    .string({ error: "Job title is required" })
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters"),

  description: z
    .string({ error: "Job description is required" })
    .min(10, "Job description must be at least 10 characters")
    .max(2000, "Job description must be less than 2000 characters"),

  category: z.enum(Object.values(JobCategory)),

  recruiter: z.string().optional(),

  jobType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "freelance",
    "internship",
  ]),

  requiredSkills: z.array(z.string()).min(1, "At least one skill is required"),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .optional(),

  status: z.enum(["open", "closed"]).optional(),

  salaryRange: z
    .string()
    .min(1, "Salary range cannot be empty")
    .max(50, "Salary range must be less than 50 characters")
    .optional(),
});

// job update validation schema
export const updateJobValidationSchema = z.object({
  title: z
    .string()
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters")
    .optional(),

  description: z
    .string()
    .min(10, "Job description must be at least 10 characters")
    .max(2000, "Job description must be less than 2000 characters")
    .optional(),

  category: z.enum(Object.values(JobCategory)).optional(),

  recruiter: z.string().optional(),

  requiredSkills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .optional(),

  jobType: z
    .enum(["full-time", "part-time", "contract", "freelance", "internship"])
    .optional(),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .optional(),

  status: z.enum(["open", "closed"]).optional(),

  salaryRange: z
    .string()
    .min(1, "Salary range cannot be empty")
    .max(50, "Salary range must be less than 50 characters")
    .optional(),
});
