import { Router } from "express";
import { ClientAllController } from "../controllers/clientAllPage.controllers.js";

export const clientAllPage = Router();

// Home Page Routes
clientAllPage.get("/home", ClientAllController.getHomePage);

// About Us Page Routes
clientAllPage.get("/about-us", ClientAllController.getAboutUsPage);

// Service Page Routes
clientAllPage.get("/service", ClientAllController.getServicePage);

// News Page Routes
clientAllPage.get("/news", ClientAllController.getNewsPage);
clientAllPage.get("/news/csr/:id", ClientAllController.getNewsCSRDetail);
clientAllPage.get("/news/article/:id", ClientAllController.getNewsDetail);

// Investor Page Routes
clientAllPage.get("/investor", ClientAllController.getInvestorRelationPage);
