import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = Router();

// user login
router.post("/login", AuthController.credentialsLogin);

// user logout
router.post("/logout", AuthController.logOut);

export const AuthRoutes: Router = router;
