import type { Request, Response } from "express";
import { responseSuccess } from "../utils/response";
import { customCatch } from "../utils/customCatch";
import { CarGalleryService } from "../services/carGallery.services";
import { carGallerySchema } from "../models/carGallery.models";

export class CarGalleryController {
	static async getAll(req: Request, res: Response) {
		try {
			const data = await CarGalleryService.getAll();
			responseSuccess(res, 200, "Get all cars success", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("Id is required");
			const data = await CarGalleryService.getById(id as string);
			responseSuccess(res, 200, "Get car success", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async create(req: Request, res: Response) {
		try {
			// Validasi Input Text
			const body = carGallerySchema.parse(req.body);

			// Panggil Service
			const data = await CarGalleryService.create(body, req.file);

			responseSuccess(res, 201, "Car added successfully", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const body = carGallerySchema.parse(req.body);
			const { id } = req.params;
			if (!id) throw new Error("Id is required");
			const data = await CarGalleryService.update(id as string, body, req.file);

			responseSuccess(res, 200, "Car updated successfully", data);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("Id is required");
			await CarGalleryService.delete(id as string);
			responseSuccess(res, 200, "Car deleted successfully");
		} catch (e) {
			customCatch(e, res);
		}
	}
}
