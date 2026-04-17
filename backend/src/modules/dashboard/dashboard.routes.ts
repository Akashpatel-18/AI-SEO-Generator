import express from "express";
import { getDashboardData } from "./dashboard.controller";
import { protect } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;
