import { Router } from "express";
import { uploadImage } from "../config/uploadImage.config";
import { CarGalleryController } from "../controllers/carGallery.controllers";

export const carGalleryRoutes = Router();

const upload = uploadImage.single("car_image");

// --- ROUTES ---
carGalleryRoutes.get("/car-gallery", CarGalleryController.getAll);
carGalleryRoutes.get("/car-gallery/:id", CarGalleryController.getById);

carGalleryRoutes.post("/car-gallery", upload, CarGalleryController.create);
carGalleryRoutes.put("/car-gallery/:id", upload, CarGalleryController.update);

carGalleryRoutes.delete("/car-gallery/:id", CarGalleryController.delete);
