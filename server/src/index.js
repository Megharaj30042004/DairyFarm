import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { ensureContentSeeded } from "./controllers/contentController.js";
import { connectDatabase } from "./config/db.js";
import Buffalo from "./models/Buffalo.js";
import Cow from "./models/Cow.js";
import authRoutes from "./routes/authRoutes.js";
import { createAnimalRoutes } from "./routes/animalRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnvPath = path.resolve(__dirname, "../../.env");
const serverEnvPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: rootEnvPath });
dotenv.config({ path: serverEnvPath, override: false });

const app = express();
const port = process.env.PORT || 8080;

// Security HTTP Headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Parse cookies
app.use(cookieParser());

// Rate Limiter for Login/Register (Prevents Brute-force attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 login/register requests per windowMs
  message: { message: "Too many login/register attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false
});

// General API Rate Limiter (Prevents DDoS/Spam)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per 15 minutes
  message: { message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(
  cors({
    origin: (origin, callback) => {
      const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, '');
      const normalizedOrigin = origin ? origin.replace(/\/$/, '') : null;
      if (!origin || normalizedOrigin === clientUrl) {
        callback(null, origin || true);
      } else {
        callback(null, true);
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/", generalLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "dairyfarm-server",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "mock-mode"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/cows", createAnimalRoutes(Cow));
app.use("/api/buffaloes", createAnimalRoutes(Buffalo));
app.use("/api/finance", financeRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/content", contentRoutes);

connectDatabase().finally(() => {
  if (mongoose.connection.readyState === 1) {
    ensureContentSeeded().catch((error) => {
      console.error("Failed to seed static content:", error.message);
    });
  }

  app.listen(port, () => {
    console.log(`Dairy Farm API listening on port ${port}`);
  });
});
