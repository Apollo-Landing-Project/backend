import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch";
import { responseSuccess } from "../utils/response";
import { ReportServices } from "../services/report.services";
import {
    reportCreateSchema,
    reportUpdateSchema,
} from "../models/report.models";

export class ReportControllers {
    static async getAll(req: Request, res: Response) {
        try {
            const { categoryId } = req.query as { categoryId?: string };
            const response = await ReportServices.getAll(categoryId);
            responseSuccess(res, 200, "Get all reports success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const response = await ReportServices.getById(id);
            responseSuccess(res, 200, "Get report by ID success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const file = req.file as Express.Multer.File;
            if (!file) throw new Error("File is required");

            const body = reportCreateSchema.parse(req.body);
            const response = await ReportServices.create(body, file);
            responseSuccess(res, 201, "Create report success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async update(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const file = req.file as Express.Multer.File;
            const body = reportUpdateSchema.parse(req.body);

            // Logic check: if change requested but no file
            if (body.file_status === "change" && !file) {
                throw new Error("File is required when status is 'change'");
            }

            const response = await ReportServices.update(id, body, file);
            responseSuccess(res, 200, "Update report success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const response = await ReportServices.delete(id);
            responseSuccess(res, 200, "Delete report success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }
}
