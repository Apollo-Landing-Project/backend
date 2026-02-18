import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch.js";
import { responseSuccess } from "../utils/response.js";
import { ReportCategoryServices } from "../services/reportCategory.services.js";
import {
    reportCategoryCreateSchema,
    reportCategoryUpdateSchema,
} from "../models/reportCategory.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";

export class ReportCategoryControllers {
    static async getAll(req: Request, res: Response) {
        try {
            const response = await ReportCategoryServices.getAll();
            responseSuccess(res, 200, "Get all report categories success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const response = await ReportCategoryServices.getById(id);
            responseSuccess(res, 200, "Get category by ID success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const body = reportCategoryCreateSchema.parse(req.body);
            const response = await ReportCategoryServices.create(body);
            await RevalidatedServices.revalidated("investor_relation")
            responseSuccess(res, 201, "Create category success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async update(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const body = reportCategoryUpdateSchema.parse(req.body);
            const response = await ReportCategoryServices.update(id, body);
            await RevalidatedServices.revalidated("investor_relation")
            responseSuccess(res, 200, "Update category success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const response = await ReportCategoryServices.delete(id);
            await RevalidatedServices.revalidated("investor_relation")
            responseSuccess(res, 200, "Delete category success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }
}
