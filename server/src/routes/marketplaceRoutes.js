import { Router } from "express";
import { createListing, listListings } from "../controllers/marketplaceController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", listListings);
router.post("/", requireAuth, createListing);

export default router;
