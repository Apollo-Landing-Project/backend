import { Router } from "express";
import { NewsNewsControllers } from "../controllers/newsNews.controllers.js";
import { uploadImage } from "../config/uploadImage.config.js";

export const newsNewsRoutes = Router();

// Upload content image (for rich text inline images) — must be before /:id routes
newsNewsRoutes.post(
    "/upload-content-image",
    uploadImage.single("content_image"),
    NewsNewsControllers.uploadContentImage,
);

// CRUD
newsNewsRoutes.post(
    "/",
    uploadImage.fields([
        { name: "image", maxCount: 1 },
        { name: "author_image", maxCount: 1 },
    ]),
    NewsNewsControllers.create,
);

newsNewsRoutes.get("/", NewsNewsControllers.getAll);
newsNewsRoutes.get("/:id", NewsNewsControllers.getById);

newsNewsRoutes.put(
    "/:id",
    uploadImage.fields([
        { name: "image", maxCount: 1 },
        { name: "author_image", maxCount: 1 },
    ]),
    NewsNewsControllers.update,
);

newsNewsRoutes.delete("/:id", NewsNewsControllers.delete);
newsNewsRoutes.patch("/:id/publish", NewsNewsControllers.togglePublish);
