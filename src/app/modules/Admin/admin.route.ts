import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { AdminController } from "./admin.controller.js";

const router = Router();

// Get all users
router.get(
  "/all-users",
  checkAuth(UserRole.ADMIN),
  AdminController.getAllUsers
);

// Get user by ID
router.get(
  "/users/:userId",
  checkAuth(UserRole.ADMIN),
  AdminController.getUserById
);

export const AdminRoutes: Router = router;
