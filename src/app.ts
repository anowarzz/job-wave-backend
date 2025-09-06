import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import router from "./app/routes/index.js";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());
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


