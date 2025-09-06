import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { UserRole } from "../user/user.interface.js";
import { JobController } from "./job.controller.js";
import { createJobValidationSchema } from "./job.validation.js";

const router = Router();

router.post(
  "/add-job",
  validateRequest(createJobValidationSchema),
  checkAuth(UserRole.RECRUITER),
  JobController.addJob
);

router.get("/all-jobs", JobController.getAllJobs);

router.get("/:id", JobController.getJobById);

export const JobRoutes: Router = router;
