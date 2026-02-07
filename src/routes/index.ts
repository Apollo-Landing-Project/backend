import { Router, type Request, type Response } from "express";
import { authRoutes } from "./auth.routes";
import { verifyToken } from "../middlewares/auth.middleware";
import { responseSuccess } from "../utils/response";
import { homePageRoutes } from "./homePage.routes";
import translateRoutes from "./translate.routes";
import { clientAllPage } from "./clientAllPage.route";

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
router.use(translateRoutes);
