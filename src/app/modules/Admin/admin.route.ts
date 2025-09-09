import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { AdminController } from "./admin.controller.js";

const router = Router();

// Get all candidates
router.get(
  "/all-candidates",
  checkAuth(UserRole.ADMIN),
  AdminController.getAllCandidates
);

// Get all recruiters
router.get(
  "/all-recruiters",
  checkAuth(UserRole.ADMIN),
  AdminController.getAllRecruiters
);

// Get user by ID
router.get(
  "/users/:userId",
  checkAuth(UserRole.ADMIN),
  AdminController.getUserById
);

// Block user
router.patch(
  "/users/block/:userId",
  checkAuth(UserRole.ADMIN),
  AdminController.blockUser
);

// Unblock user
router.patch(
  "/users/unblock/:userId",
  checkAuth(UserRole.ADMIN),
  AdminController.unblockUser
);

// Get analytics
router.get(
  "/analytics",
  checkAuth(UserRole.ADMIN),
  AdminController.getAnalytics
);

// Get all jobs
router.get("/all-jobs", checkAuth(UserRole.ADMIN), AdminController.getAllJobs);

// Delete user
router.delete(
  "/users/delete/:userId",
  checkAuth(UserRole.ADMIN),
  AdminController.deleteUser
);

export const AdminRoutes: Router = router;
