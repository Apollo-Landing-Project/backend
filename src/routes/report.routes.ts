import { Router } from "express";
import { ReportControllers } from "../controllers/report.controllers";
import { uploadFile } from "../config/uploadFile.config";

export const reportRoutes = Router();

reportRoutes.get("/report", ReportControllers.getAll);
reportRoutes.get("/report/:id", ReportControllers.getById);
reportRoutes.post(
    "/report",
    uploadFile.fields([
        { name: "file_url", maxCount: 1 },
        { name: "news_image", maxCount: 1 },
        { name: "news_author_image", maxCount: 1 },
    ]),
    ReportControllers.create,
);
reportRoutes.put(
    "/report/:id",
    uploadFile.fields([
        { name: "file_url", maxCount: 1 },
        { name: "news_image", maxCount: 1 },
        { name: "news_author_image", maxCount: 1 },
    ]),
    ReportControllers.update,
);
reportRoutes.delete("/report/:id", ReportControllers.delete);
