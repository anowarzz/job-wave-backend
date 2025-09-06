import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

// create a user
router.post("/register", userController.createUser);

export const UserRoutes: Router = router;
