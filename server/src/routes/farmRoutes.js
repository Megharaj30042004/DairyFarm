import { Router } from "express";
import { getFarmProfile, upsertFarmProfile } from "../controllers/farmController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getFarmProfile);
router.put("/", requireAuth, upsertFarmProfile);

export default router;
