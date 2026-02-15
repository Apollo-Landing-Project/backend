import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch";
import { responseSuccess } from "../utils/response";
import { NewsNewsServices } from "../services/newsNews.services";
import {
    newsNewsCreateSchema,
    newsNewsUpdateSchema,
} from "../models/newsNews.models";
import { RevalidatedServices } from "../services/revalidated.services";

export class NewsNewsControllers {
    static async getAll(req: Request, res: Response) {
        try {
            const data = await NewsNewsServices.getAll();
            responseSuccess(res, 200, "Get all news success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const data = await NewsNewsServices.getById(id as string);
            responseSuccess(res, 200, "Get news by ID success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
            const imageFile = files?.image?.[0];
            const authorImageFile = files?.author_image?.[0];

            const validatedBody = newsNewsCreateSchema.parse(req.body);

            const data = await NewsNewsServices.create(
                validatedBody,
                imageFile,
                authorImageFile,
            );
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 201, "News created successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
            const imageFile = files?.image?.[0];
            const authorImageFile = files?.author_image?.[0];

            const validatedBody = newsNewsUpdateSchema.parse(req.body);

            if (validatedBody.image_status === "change" && !imageFile) {
                throw new Error("Image is required when status is 'change'");
            }

            const data = await NewsNewsServices.update(
                id as string,
                validatedBody,
                imageFile,
                authorImageFile,
            );
            
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 200, "News updated successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            await NewsNewsServices.delete(id as string);
            
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 200, "News deleted successfully");
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async togglePublish(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const data = await NewsNewsServices.togglePublish(id as string);
            
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")
            
            responseSuccess(res, 200, "News publish status toggled", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async uploadContentImage(req: Request, res: Response) {
        try {
            const file = req.file as Express.Multer.File;
            if (!file) throw new Error("Image file is required");

            const data = await NewsNewsServices.uploadContentImage(file);
            
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")
            
            responseSuccess(res, 201, "Content image uploaded", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    
}
