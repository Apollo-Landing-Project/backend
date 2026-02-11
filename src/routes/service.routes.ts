import { Router } from "express";
import { uploadImage } from "../config/uploadImage.config";
import { ServiceItemController } from "../controllers/service.controllers";

export const serviceRoutes = Router();
const upload = uploadImage.single("bg_image");

// CRUD Standard
serviceRoutes.get("/items", ServiceItemController.getAll);
serviceRoutes.get("/items/:id", ServiceItemController.getById);
serviceRoutes.post("/items", upload, ServiceItemController.create);
serviceRoutes.put("/items/:id", upload, ServiceItemController.update);
serviceRoutes.delete("/items/:id", ServiceItemController.delete);

// Special Actions
serviceRoutes.patch("/items/:id/toggle", ServiceItemController.toggleActive);
serviceRoutes.patch("/items/reorder", ServiceItemController.updateOrder);
