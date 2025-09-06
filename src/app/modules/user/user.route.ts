import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { userController } from "./user.controller.js";
import { createUserValidationSchema } from "./user.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "./user.interface.js";

const router = Router();

// create a user
router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  userController.createUser
);

// get user profile - get me
router.get(
  "/me",
  checkAuth(...Object.values(UserRole)),
  userController.getMyProfile
);




export const UserRoutes: Router = router;
