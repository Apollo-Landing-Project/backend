import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../models/auth.models.js";
import { homePageCreateSchema } from "../models/homePage.models.js";
import { HomePageControllers } from "../controllers/homePage.controllers.js";
import { uploadImage } from "../config/uploadImage.config.js";

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
	uploadImage.array("hero_bg", 3),
	HomePageControllers.update,
);
