import { Router } from "express";
import { ClientAllController } from "../controllers/clientAllPage";

export const clientAllPage = Router();

// Home Page Routes
clientAllPage.get("/home", ClientAllController.getHomePage);

// About Us Page Routes
clientAllPage.get("/about-us", ClientAllController.getAboutUsPage);

// Service Page Routes
clientAllPage.get("/service", ClientAllController.getServicePage);
