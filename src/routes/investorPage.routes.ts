import { Router } from "express";
import { InvestorPageControllers } from "../controllers/investorPage.controllers.js";
import { uploadImage } from "../config/uploadImage.config.js";

export const investorPageRoutes = Router();

investorPageRoutes.post(
    "/investor",
    uploadImage.single("hero_bg"),
    InvestorPageControllers.create,
);

investorPageRoutes.get("/investor", InvestorPageControllers.getAll);
investorPageRoutes.get("/investor/:id", InvestorPageControllers.getById);
investorPageRoutes.delete("/investor/:id", InvestorPageControllers.delete);
investorPageRoutes.patch("/investor/:id/active", InvestorPageControllers.toggleActive);
// Update Route
investorPageRoutes.put(
    "/investor/:id",
    uploadImage.single("hero_bg"),
    InvestorPageControllers.update,
);
