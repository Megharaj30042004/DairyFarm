import { Router } from "express";
import { createAnimalController } from "../controllers/animalController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

export function createAnimalRoutes(Model) {
  const router = Router();
  const controller = createAnimalController(Model);

  router.get("/", requireAuth, controller.list);
  router.post("/", requireAuth, controller.create);
  router.put("/bulk", requireAuth, controller.bulkUpsert);
  router.put("/:id", requireAuth, controller.update);
  router.delete("/:id", requireAuth, controller.remove);

  return router;
}
