import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import passport from "passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import router from "./app/routes/index.js";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://jobwave-dun.vercel.app",
      "http://localhost:3000",
      "http://10.0.0.103:3000",
    ],
    credentials: true,
  })
);

app.use("/api/v1", router);

// Testing API HomeRoute
const test = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome To The Job Wave Server",
  });
};

app.get("/", test);

// Global error handler
app.use(globalErrorHandler);

// not found route handler
app.use(notFound);

export default app;
