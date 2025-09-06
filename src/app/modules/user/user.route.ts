import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { userController } from "./user.controller.js";
import { createUserValidationSchema } from "./user.validation.js";

const router = Router();

// create a user
router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  userController.createUser
);

export const UserRoutes: Router = router;
