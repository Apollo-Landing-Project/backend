import type { Request, Response } from "express";
import { responseSuccess } from "../utils/response";
import { customCatch } from "../utils/customCatch";
import { SharesService } from "../services/shares.services";
import { sharesSchema } from "../models/shares.models";
import { RevalidatedServices } from "../services/revalidated.services";

export class SharesController {
    static async getAll(req: Request, res: Response) {
        try {
            const data = await SharesService.getAll();
            responseSuccess(res, 200, "Get all shares success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("Id is required");
            const data = await SharesService.getById(id as string);
            responseSuccess(res, 200, "Get shares success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const body = sharesSchema.parse(req.body);
            const data = await SharesService.create(body);
            await RevalidatedServices.revalidated("investor_relation")
            responseSuccess(res, 201, "Shares added successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const body = sharesSchema.parse(req.body);
            const { id } = req.params;
            if (!id) throw new Error("Id is required");
            const data = await SharesService.update(id as string, body);
            await RevalidatedServices.revalidated("investor_relation")

            responseSuccess(res, 200, "Shares updated successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("Id is required");
            await SharesService.delete(id as string);
            await RevalidatedServices.revalidated("investor_relation")

            responseSuccess(res, 200, "Shares deleted successfully");
        } catch (e) {
            customCatch(e, res);
        }
    }
}
