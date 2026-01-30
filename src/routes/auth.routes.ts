import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../models/auth.models";

export const authRoutes = Router();

authRoutes.post(
	"/register",
	validate(registerSchema),
	AuthControllers.register,
);
authRoutes.post("/login", validate(loginSchema), AuthControllers.login);
authRoutes.post("/logout", AuthControllers.logout);
