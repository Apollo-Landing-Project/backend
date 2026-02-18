import { Router } from "express";
import { uploadImage } from "../config/uploadImage.config.js";
import { CarGalleryController } from "../controllers/carGallery.controllers.js";

export const carGalleryRoutes = Router();

const upload = uploadImage.single("car_image");

// --- ROUTES ---
carGalleryRoutes.get("/car-gallery", CarGalleryController.getAll);
carGalleryRoutes.get("/car-gallery/:id", CarGalleryController.getById);

carGalleryRoutes.post("/car-gallery", upload, CarGalleryController.create);
carGalleryRoutes.put("/car-gallery/:id", upload, CarGalleryController.update);

carGalleryRoutes.delete("/car-gallery/:id", CarGalleryController.delete);
