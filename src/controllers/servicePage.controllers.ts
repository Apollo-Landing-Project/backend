import { responseSuccess } from "../utils/response";
import { customCatch } from "../utils/customCatch";
import type { Request, Response } from "express";
import { ServicePageService } from "../services/servicePage.services";
import { servicePageSchema } from "../models/servicePage.models";
import { RevalidatedServices } from "../services/revalidated.services";

export class ServicePageController {
	static async getAll(req: Request, res: Response) {
		try {
			const data = await ServicePageService.getAll();
			responseSuccess(res, 200, "Get all pages success", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("ID is required");
			const data = await ServicePageService.getById(id as string);
			responseSuccess(res, 200, "Get page success", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const body = servicePageSchema.parse(req.body);
			const data = await ServicePageService.create(body, req.file);
			await RevalidatedServices.revalidated("services")
			
			responseSuccess(res, 201, "Page created successfully", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const body = servicePageSchema.parse(req.body);

			const { id } = req.params;
			if (!id) throw new Error("ID is required");

			const data = await ServicePageService.update(
				id as string,
				body,
				req.file,
			);
			await RevalidatedServices.revalidated("services")

			responseSuccess(res, 200, "Page updated successfully", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async toggleActive(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("ID is required");
			await ServicePageService.toggleActive(id as string);
			await RevalidatedServices.revalidated("services")
			responseSuccess(res, 200, "Page activated");
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("ID is required");
			await ServicePageService.delete(id as string);
			await RevalidatedServices.revalidated("services")

			responseSuccess(res, 200, "Page deleted");
		} catch (e) {
			customCatch(e, res);
		}
	}
}
