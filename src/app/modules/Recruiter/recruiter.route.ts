import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { RecruiterController } from "./recruiter.controller.js";

const router = Router();

// Get all jobs posted by the  recruiter
router.get(
  "/my-posted-jobs",
  checkAuth(UserRole.RECRUITER),
  RecruiterController.getMyJobs
);

export const RecruiterRoutes: Router = router;
