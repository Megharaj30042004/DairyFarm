import { Router } from "express";
import { getFinance, upsertFinance } from "../controllers/financeController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getFinance);
router.put("/", requireAuth, upsertFinance);

export default router;
