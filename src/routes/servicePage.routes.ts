import { Router } from "express";
import { uploadImage } from "../config/uploadImage.config";
import { ServicePageController } from "../controllers/servicePage.controllers";

export const servicesPageRoutes = Router();
const uploadHero = uploadImage.single("hero_bg");

// --- SERVICE PAGE ROUTES ---
servicesPageRoutes.get("/service", ServicePageController.getAll); // List Versions
servicesPageRoutes.get("/service/:id", ServicePageController.getById); // Get Detail
servicesPageRoutes.post("/service", uploadHero, ServicePageController.create); // Create New
servicesPageRoutes.put(
	"/service/:id",
	uploadHero,
	ServicePageController.update,
); // Update
servicesPageRoutes.patch(
	"/service/:id/active",
	ServicePageController.toggleActive,
); // Toggle
servicesPageRoutes.delete("/service/:id", ServicePageController.delete); // Delete
