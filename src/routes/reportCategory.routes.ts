import { Router } from "express";
import { ReportCategoryControllers } from "../controllers/reportCategory.controllers.js";

export const reportCategoryRoutes = Router();

reportCategoryRoutes.get(
    "/report-category",
    ReportCategoryControllers.getAll,
);
reportCategoryRoutes.get(
    "/report-category/:id",
    ReportCategoryControllers.getById,
);
reportCategoryRoutes.post(
    "/report-category",
    ReportCategoryControllers.create,
);
reportCategoryRoutes.put(
    "/report-category/:id",
    ReportCategoryControllers.update,
);
reportCategoryRoutes.delete(
    "/report-category/:id",
    ReportCategoryControllers.delete,
);
