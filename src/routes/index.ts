import { Router, type Request, type Response } from "express";
import { authRoutes } from "./auth.routes.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { responseSuccess } from "../utils/response.js";
import { homePageRoutes } from "./homePage.routes.js";
import translateRoutes from "./translate.routes.js";
import { clientAllPage } from "./clientAllPage.route.js";
import { newsPageRoutes } from "./newsPage.routes.js";
import { aboutUsPageRoutes } from "./aboutUsPage.routes.js";
import { servicesPageRoutes } from "./servicePage.routes.js";
import { serviceRoutes } from "./service.routes.js";
import { carGalleryRoutes } from "./carGallery.routes.js";
import { newsNewsRoutes } from "./newsNews.routes.js";
import { newsCSRRoutes } from "./newsCSR.routes.js";
import { partnerRoutes } from "./partner.routes.js";
import { investorPageRoutes } from "./investorPage.routes.js";
import { sharesRoutes } from "./shares.routes.js";

import { reportCategoryRoutes } from "./reportCategory.routes.js";
import { reportRoutes } from "./report.routes.js";

export const router = Router();

// CLIENT
router.use("/client", clientAllPage);

// CMS
router.use("/auth", authRoutes);
router.use(verifyToken);
router.use("/protected", (req: Request, res: Response) => {
	responseSuccess(res, 200, "Suuceesss", { testing: "HELLO WORLD" });
});
router.use("/page", homePageRoutes);
router.use("/page", newsPageRoutes);
router.use("/page", aboutUsPageRoutes);
router.use("/page", servicesPageRoutes);
router.use("/page", investorPageRoutes);
router.use("/service", serviceRoutes);
router.use("/news-news", newsNewsRoutes);
router.use("/news-csr", newsCSRRoutes);
router.use(carGalleryRoutes);
router.use(partnerRoutes);
router.use(sharesRoutes);
router.use(reportCategoryRoutes);
router.use(reportRoutes);
router.use(translateRoutes);
