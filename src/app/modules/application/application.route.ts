import { Router } from "express";
import { ApplicationController } from "./application.controller.js";

const router = Router();

router.post("/new", ApplicationController.createApplication);

export const ApplicationRoutes: Router = router;
