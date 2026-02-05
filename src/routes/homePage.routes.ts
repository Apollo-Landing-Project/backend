import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../models/auth.models";
import { homePageCreateSchema } from "../models/homePage.models";
import { HomePageControllers } from "../controllers/homePage.controllers";
import { uploadImage } from "../config/uploadImage.config";

export const homePageRoutes = Router();

homePageRoutes.post(
	"/home",
	uploadImage.array("hero_bg", 3),
	HomePageControllers.create,
);

homePageRoutes.get("/home", HomePageControllers.getAll);
homePageRoutes.get("/home/:id", HomePageControllers.getById);
homePageRoutes.delete("/home/:id", HomePageControllers.delete);
homePageRoutes.patch("/home/:id/active", HomePageControllers.toggleActive);
// Update Route
homePageRoutes.put(
	"/home/:id",
	uploadImage.array("hero_bg", 3), // Max 3 file baru
	// validate(homePageUpdateSchema), // Buat schema update yg fieldnya optional
	HomePageControllers.update,
);
