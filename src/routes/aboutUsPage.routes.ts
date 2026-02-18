import { Router } from "express";
import { uploadImage } from "../config/uploadImage.config.js";
import { AboutUsPageControllers } from "../controllers/aboutUsPage.controllers.js";

export const aboutUsPageRoutes = Router();

const uploadFields = uploadImage.fields([
	// Global Images
	{ name: "hero_bg", maxCount: 1 },
	{ name: "vision_image_parent", maxCount: 1 },
	{ name: "vision_image_child", maxCount: 1 },
	{ name: "mission_image_parent", maxCount: 1 },
	{ name: "mission_image_child", maxCount: 1 },
	{ name: "history_image_parent", maxCount: 1 },
	{ name: "history_image_child", maxCount: 1 },

	// List Images
	{ name: "governance_photos", maxCount: 50 },
	{ name: "company_structure_icons", maxCount: 50 },
]);

aboutUsPageRoutes.get("/about-us", AboutUsPageControllers.getAll);
aboutUsPageRoutes.get("/about-us/:id", AboutUsPageControllers.getById);

aboutUsPageRoutes.post(
	"/about-us",
	uploadFields,
	AboutUsPageControllers.create,
);
aboutUsPageRoutes.put(
	"/about-us/:id",
	uploadFields,
	AboutUsPageControllers.update,
);
aboutUsPageRoutes.delete("/about-us/:id", AboutUsPageControllers.delete);
aboutUsPageRoutes.patch(
	"/about-us/:id/active",
	AboutUsPageControllers.toggleActive,
);
