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

// Apply for a job
router.post(
  "/apply/:jobId",
  checkAuth(UserRole.CANDIDATE),
  candidateController.applyForJob
);

export const CandidateRoutes: Router = router;
