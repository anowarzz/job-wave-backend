import cors from "cors";
import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// Testing API HomeRoute
const test = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome To The Job Wave Server",
  });
};

app.get("/", test);

// route error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
