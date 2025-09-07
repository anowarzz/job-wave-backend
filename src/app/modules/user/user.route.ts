import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { userController } from "./user.controller.js";
import { UserRole } from "./user.interface.js";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation.js";

const router = Router();

// create a user
router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  userController.createUser
);

// get user own profile
router.get(
  "/me",
  checkAuth(...Object.values(UserRole)),
  userController.getMyProfile
);

// get any user profile by userId
router.get("/:userId",
  checkAuth(...Object.values(UserRole)),
  userController.getUserProfile);

// update a user info
router.patch(
  "/update/:id",
  validateRequest(updateUserValidationSchema),
  checkAuth(...Object.values(UserRole)),
  userController.updateUser
);

export const UserRoutes: Router = router;
