import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { CandidateRoutes } from "../modules/Candidate/candidate.route.js";
import { JobRoutes } from "../modules/job/job.route.js";
import { RecruiterRoutes } from "../modules/Recruiter/recruiter.route.js";
import { UserRoutes } from "../modules/user/user.route.js";

const router: Router = Router();

const moduleRoutes = [
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
  {
    path: "/candidate",
    route: CandidateRoutes,
  },
  {
    path: "/recruiter",
    route: RecruiterRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
