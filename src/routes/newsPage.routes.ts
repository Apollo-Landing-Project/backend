import { Router } from "express";
import { NewsPageControllers } from "../controllers/newsPage.controllers";
import { uploadImage } from "../config/uploadImage.config";

export const newsPageRoutes = Router();

newsPageRoutes.post(
	"/news",
	uploadImage.single("hero_bg"),
	NewsPageControllers.create,
);

newsPageRoutes.get("/news", NewsPageControllers.getAll);
newsPageRoutes.get("/news/:id", NewsPageControllers.getById);
newsPageRoutes.delete("/news/:id", NewsPageControllers.delete);
newsPageRoutes.patch("/news/:id/active", NewsPageControllers.toggleActive);
// Update Route
newsPageRoutes.put(
	"/news/:id",
	uploadImage.single("hero_bg"),
	NewsPageControllers.update,
);
