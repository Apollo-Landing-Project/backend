import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch";
import { responseSuccess } from "../utils/response";
import { InvestorPageServices } from "../services/investorPage.services";
import {
    investorPageCreateSchema,
    investorPageUpdateSchema,
    type InvestorPageUpdateInput,
} from "../models/investorPage.models";

export class InvestorPageControllers {
    static async getAll(req: Request, res: Response) {
        try {
            const response = await InvestorPageServices.getAll();
            responseSuccess(res, 200, "Get all investor pages success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            if (!id) throw new Error("ID is required");

            const response = await InvestorPageServices.getById(id);
            responseSuccess(res, 200, "Get investor page by ID success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { body, file } = req;
            const fileTypeDeclare = file as Express.Multer.File;
            if (!fileTypeDeclare) {
                throw new Error("Image is required");
            }

            const validatedBody = investorPageCreateSchema.parse(body);

            const response = await InvestorPageServices.create(
                validatedBody,
                fileTypeDeclare,
            );

            responseSuccess(res, 201, "Create investor page success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async update(
        req: Request<{ id: string }, {}, InvestorPageUpdateInput>,
        res: Response,
    ) {
        try {
            const { id } = req.params;
            const { body, file } = req;

            if (!id) throw new Error("ID is required");

            const validatedBody = investorPageUpdateSchema.parse({ ...body });

            const fileTypeDeclare = file as Express.Multer.File;

            if (validatedBody.image_status === "change" && !fileTypeDeclare) {
                throw new Error("Image is required when status is 'change'");
            }

            const response = await InvestorPageServices.update(
                id,
                validatedBody,
                fileTypeDeclare,
            );

            responseSuccess(res, 200, "Update investor page success", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async toggleActive(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const response = await InvestorPageServices.toggleActive(id);
            responseSuccess(res, 200, "Investor page activated successfully", response);
        } catch (e) {
            customCatch(e, res);
        }
    }

    static async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            if (!id) throw new Error("ID is required");

            const response = await InvestorPageServices.delete(id);
            responseSuccess(res, 200, "Investor page deleted successfully", response);
        } catch (e) {
            customCatch(e, res);
        }
    }
}
