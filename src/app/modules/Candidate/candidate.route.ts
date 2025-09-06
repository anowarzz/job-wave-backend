import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { candidateController } from "./candidate.controller.js";

const router = Router();

router.get(
  "/my-applications",
  checkAuth(UserRole.CANDIDATE),
  candidateController.getMyApplications
);

export const CandidateRoutes: Router = router;
