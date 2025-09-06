import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { UserRole } from "../user/user.interface.js";
import { JobController } from "./job.controller.js";
import {
  createJobValidationSchema,
  updateJobValidationSchema,
} from "./job.validation.js";

const router = Router();
// add a job
router.post(
  "/add-job",
  validateRequest(createJobValidationSchema),
  checkAuth(UserRole.RECRUITER),
  JobController.addJob
);

// get all jobs
router.get("/all-jobs", JobController.getAllJobs);

// get job by ID
router.get("/:id", JobController.getJobById);

// update a job
router.patch(
  "/:id",
  validateRequest(updateJobValidationSchema),
  checkAuth(UserRole.RECRUITER),
  JobController.updateJob
);

export const JobRoutes: Router = router;
