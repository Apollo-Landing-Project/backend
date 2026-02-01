import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { verifyToken } from "../middlewares/auth.middleware";
import { responseSuccess } from "../utils/response";
export const router = Router();
router.use("/auth", authRoutes);
router.use(verifyToken);
router.use("/protected", (req, res) => {
    responseSuccess(res, 200, "Suuceesss");
});
//# sourceMappingURL=index.js.map