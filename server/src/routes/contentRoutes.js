import { Router } from "express";
import {
  chatWithAi,
  getDiseases,
  getEmergencyContacts
} from "../controllers/contentController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/diseases", getDiseases);
router.get("/emergency-contacts", getEmergencyContacts);
router.post("/chat", requireAuth, chatWithAi);

export default router;
