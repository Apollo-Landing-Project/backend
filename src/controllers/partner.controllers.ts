import type { Request, Response } from "express";
import { responseSuccess } from "../utils/response.js";
import { customCatch } from "../utils/customCatch.js";
import { PartnerService } from "../services/partner.services.js";
import { partnerSchema } from "../models/partner.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";

export class PartnerController {
    static async getAll(req: Request, res: Response) {
        try {
            const data = await PartnerService.getAll();
            responseSuccess(res, 200, "Get all partners success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("Id is required");
            const data = await PartnerService.getById(id as string);
            responseSuccess(res, 200, "Get partner success", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const body = partnerSchema.parse(req.body);
            const data = await PartnerService.create(body, req.file);
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 201, "Partner added successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const body = partnerSchema.parse(req.body);
            const { id } = req.params;
            if (!id) throw new Error("Id is required");
            const data = await PartnerService.update(id as string, body, req.file);
            await RevalidatedServices.revalidated("home")

            responseSuccess(res, 200, "Partner updated successfully", data);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("Id is required");
            await PartnerService.delete(id as string);
            await RevalidatedServices.revalidated("home")
            
            responseSuccess(res, 200, "Partner deleted successfully");
        } catch (e) {
            customCatch(e, res);
        }
    }
}
