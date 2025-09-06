import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { JobRoutes } from "../modules/job/job.route.js";
import { UserRoutes } from "../modules/user/user.route.js";
import { ApplicationRoutes } from "../modules/application/application.route.js";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/applications",
    route: ApplicationRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/jobs",
    route: JobRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
