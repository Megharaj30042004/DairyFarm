import { Router } from "express";
import { createListing, deleteListing, listListings, updateListing } from "../controllers/marketplaceController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", listListings);
router.post("/", requireAuth, createListing);
router.put("/:id", requireAuth, updateListing);
router.delete("/:id", requireAuth, deleteListing);

export default router;

