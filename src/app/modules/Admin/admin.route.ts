import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { AdminController } from "./admin.controller.js";

const router = Router();

// Get all candidates
router.get(
  "/candidates",
  checkAuth(UserRole.ADMIN),
  AdminController.getAllCandidates
);

// Get all recruiters
router.get(
  "/recruiters",
  checkAuth(UserRole.ADMIN),
  AdminController.getAllRecruiters
);

// Get user by ID
router.get(
  "/users/:userId",
  checkAuth(UserRole.ADMIN),
  AdminController.getUserById
);

export const AdminRoutes: Router = router;
