import { Router } from "express";
import { uploadImage } from "../config/uploadImage.config";
import { PartnerController } from "../controllers/partner.controllers";

export const partnerRoutes = Router();

const upload = uploadImage.single("logo_image");

// --- ROUTES ---
partnerRoutes.get("/partner", PartnerController.getAll);
partnerRoutes.get("/partner/:id", PartnerController.getById);

partnerRoutes.post("/partner", upload, PartnerController.create);
partnerRoutes.put("/partner/:id", upload, PartnerController.update);

partnerRoutes.delete("/partner/:id", PartnerController.delete);
