import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch";
import { responseSuccess } from "../utils/response";
import { NewsCSRServices } from "../services/newsCSR.services";
import {
    newsCSRCreateSchema,
    newsCSRUpdateSchema,
} from "../models/newsCSR.models";
import { RevalidatedServices } from "../services/revalidated.services";

export class NewsCSRControllers {
    static async getAll(req: Request, res: Response) {
        try {
            const data = await NewsCSRServices.getAll();
            responseSuccess(res, 200, "Get all CSR news success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const data = await NewsCSRServices.getById(id);
            responseSuccess(res, 200, "Get CSR news by ID success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
            const imageFiles = files?.images ?? [];
            const authorImageFile = files?.author_image?.[0];

            const validatedBody = newsCSRCreateSchema.parse(req.body);

            const data = await NewsCSRServices.create(
                validatedBody,
                imageFiles,
                authorImageFile,
            );
            
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 201, "CSR news created successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async update(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
            const newImageFiles = files?.images ?? [];
            const authorImageFile = files?.author_image?.[0];

            const validatedBody = newsCSRUpdateSchema.parse(req.body);

            const data = await NewsCSRServices.update(
                id,
                validatedBody,
                newImageFiles,
                authorImageFile,
            );
            
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 200, "CSR news updated successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            await NewsCSRServices.delete(id);
            
            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 200, "CSR news deleted successfully");
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async togglePublish(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const data = await NewsCSRServices.togglePublish(id);

            await RevalidatedServices.revalidated("news")
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 200, "CSR news publish status toggled", data);
        } catch (e) {
            customCatch(e, res);
        }
    }
}
