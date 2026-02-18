import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../models/auth.models.js";

export const authRoutes = Router();

authRoutes.post(
	"/register",
	validate(registerSchema),
	AuthControllers.register,
);
authRoutes.post("/login", validate(loginSchema), AuthControllers.login);
authRoutes.post("/logout", AuthControllers.logout);
