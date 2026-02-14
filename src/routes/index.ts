import { Router, type Request, type Response } from "express";
import { authRoutes } from "./auth.routes";
import { verifyToken } from "../middlewares/auth.middleware";
import { responseSuccess } from "../utils/response";
import { homePageRoutes } from "./homePage.routes";
import translateRoutes from "./translate.routes";
import { clientAllPage } from "./clientAllPage.route";
import { newsPageRoutes } from "./newsPage.routes";
import { aboutUsPageRoutes } from "./aboutUsPage.routes";
import { servicesPageRoutes } from "./servicePage.routes";
import { serviceRoutes } from "./service.routes";
import { carGalleryRoutes } from "./carGallery.routes";
import { newsNewsRoutes } from "./newsNews.routes";
import { newsCSRRoutes } from "./newsCSR.routes";
import { partnerRoutes } from "./partner.routes";
import { investorPageRoutes } from "./investorPage.routes";
import { sharesRoutes } from "./shares.routes";

import { reportCategoryRoutes } from "./reportCategory.routes";
import { reportRoutes } from "./report.routes";

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
