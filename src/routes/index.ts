import { Router, type Request, type Response } from "express";
import { authRoutes } from "./auth.routes";
import { verifyToken } from "../middlewares/auth.middleware";
import { responseSuccess } from "../utils/response";
import { homePageRoutes } from "./homePage.routes";
import translateRoutes from "./translate.routes";

export const router = Router();

router.use("/auth", authRoutes);
router.use(verifyToken);
router.use("/protected", (req: Request, res: Response) => {
	responseSuccess(res, 200, "Suuceesss", { testing: "HELLO WORLD" });
});
router.use("/page", homePageRoutes);
router.use(translateRoutes);
