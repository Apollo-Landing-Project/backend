import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../models/auth.models";
import { homePageCreateSchema } from "../models/homePage.models";
import { HomePageControllers } from "../controllers/homePage.controllers";
import { uploadImage } from "../config/uploadImage.config";

export const clientAllPage = Router();

// Home Page Routes
clientAllPage.get("/home", HomePageControllers.getClient);
