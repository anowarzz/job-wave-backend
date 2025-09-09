import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { candidateController } from "./candidate.controller.js";

const router = Router();

// Get candidate's applications
router.get(
  "/my-applications",
  checkAuth(UserRole.CANDIDATE),
  candidateController.getMyApplications
);

// Get candidate's saved jobs
router.get(
  "/my-saved-jobs",
  checkAuth(UserRole.CANDIDATE),
  candidateController.getMySavedJobs
);

// Apply for a job
router.post(
  "/apply/:jobId",
  checkAuth(UserRole.CANDIDATE),
  candidateController.applyForJob
);

// Save a job
router.post(
  "/save-job/:jobId",
  checkAuth(UserRole.CANDIDATE),
  candidateController.saveJob
);

// Remove saved job
router.delete(
  "/remove-saved-job/:jobId",
  checkAuth(UserRole.CANDIDATE),
  candidateController.removeSavedJob
);

export const CandidateRoutes: Router = router;
