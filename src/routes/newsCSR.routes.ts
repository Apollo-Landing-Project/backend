import { Router } from "express";
import { NewsCSRControllers } from "../controllers/newsCSR.controllers.js";
import { uploadImage } from "../config/uploadImage.config.js";

export const newsCSRRoutes = Router();

// CRUD
newsCSRRoutes.post(
    "/",
    uploadImage.fields([
        { name: "images", maxCount: 10 },
        { name: "author_image", maxCount: 1 },
    ]),
    NewsCSRControllers.create,
);

newsCSRRoutes.get("/", NewsCSRControllers.getAll);
newsCSRRoutes.get("/:id", NewsCSRControllers.getById);

newsCSRRoutes.put(
    "/:id",
    uploadImage.fields([
        { name: "images", maxCount: 10 },
        { name: "author_image", maxCount: 1 },
    ]),
    NewsCSRControllers.update,
);

newsCSRRoutes.delete("/:id", NewsCSRControllers.delete);
newsCSRRoutes.patch("/:id/publish", NewsCSRControllers.togglePublish);
