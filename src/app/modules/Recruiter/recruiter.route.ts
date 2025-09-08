import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createJobValidationSchema } from "../job/job.validation.js";
import { UserRole } from "../user/user.interface.js";
import { RecruiterController } from "./recruiter.controller.js";

const router = Router();

// Add a job
router.post(
  "/jobs/add-job",
  validateRequest(createJobValidationSchema),
  checkAuth(UserRole.RECRUITER),
  RecruiterController.addJob
);

// Get all jobs posted by the recruiter
router.get(
  "/my-posted-jobs",
  checkAuth(UserRole.RECRUITER),
  RecruiterController.getMyPostedJobs
);

// Get all applications for a specific job
router.get(
  "/job/:jobId/applications",
  checkAuth(UserRole.RECRUITER),
  RecruiterController.getJobApplications
);

// Get analytics for recruiter
router.get(
  "/analytics",
  checkAuth(UserRole.RECRUITER),
  RecruiterController.getAnalytics
);

export const RecruiterRoutes: Router = router;
