import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import seoContentRoutes from "./modules/seoContent/seoContent.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import { apiLimiter } from "./middleware/rateLimit.middleware";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/seoContent", seoContentRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use(errorHandler);

export default app;
