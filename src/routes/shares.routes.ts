import { Router } from "express";
import { SharesController } from "../controllers/shares.controllers";

export const sharesRoutes = Router();

// --- ROUTES ---
sharesRoutes.get("/shares", SharesController.getAll);
sharesRoutes.get("/shares/:id", SharesController.getById);

sharesRoutes.post("/shares", SharesController.create);
sharesRoutes.put("/shares/:id", SharesController.update);

sharesRoutes.delete("/shares/:id", SharesController.delete);
