import { Router } from "express";
import {
  getDiseases,
  getEmergencyContacts
} from "../controllers/contentController.js";

const router = Router();

router.get("/diseases", getDiseases);
router.get("/emergency-contacts", getEmergencyContacts);

export default router;
