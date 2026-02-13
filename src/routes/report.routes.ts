import { Router } from "express";
import { ReportControllers } from "../controllers/report.controllers";
import { uploadFile } from "../config/uploadFile.config";

export const reportRoutes = Router();

reportRoutes.get("/report", ReportControllers.getAll);
reportRoutes.get("/report/:id", ReportControllers.getById);
reportRoutes.post(
    "/report",
    uploadFile.single("file_url"),
    ReportControllers.create,
);
reportRoutes.put(
    "/report/:id",
    uploadFile.single("file_url"),
    ReportControllers.update,
);
reportRoutes.delete("/report/:id", ReportControllers.delete);
