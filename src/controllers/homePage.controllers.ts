import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch";
import { responseSuccess } from "../utils/response";
import { HomePageServices } from "../services/homePage.services";
import {
	homePageCreateSchema,
	homePageUpdateSchema,
	type HomePageCreateInput,
	type HomePageUpdateInput,
} from "../models/homePage.models";

export class HomePageControllers {
	static async getAll(req: Request, res: Response) {
		try {
			const response = await HomePageServices.getAll();
			responseSuccess(res, 200, "Get all home pages success", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getById(req: Request<{ id: string }>, res: Response) {
		try {
			const { id } = req.params;

			if (!id) throw new Error("ID is required");

			const response = await HomePageServices.getById(id);
			responseSuccess(res, 200, "Get home page by ID success", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const { body, files } = req;

			const fileList = files as Express.Multer.File[];
			if (!fileList || fileList.length !== 3) {
				throw new Error("Exactly 3 image files are required for creation");
			}

			const validatedBody = homePageCreateSchema.parse(body);

			const response = await HomePageServices.create(validatedBody, fileList);

			responseSuccess(res, 201, "Create home page success", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async update(
		req: Request<{ id: string }, {}, HomePageUpdateInput>,
		res: Response,
	) {
		try {
			const { id } = req.params;
			const { body, files } = req;

			if (!id) throw new Error("ID is required");

			const validatedBody = homePageUpdateSchema.parse(body);

			const fileList = (files as Express.Multer.File[]) || [];

			const changesCount = validatedBody.image_status?.filter(
				(s) => s === "change",
			).length;

			if (changesCount !== undefined && fileList.length !== changesCount) {
				throw new Error(
					`Mismatch: You requested to change ${changesCount} images, but uploaded ${fileList.length} files.`,
				);
			}

			const response = await HomePageServices.update(
				id,
				validatedBody,
				fileList,
			);

			responseSuccess(res, 200, "Update home page success", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async toggleActive(req: Request<{ id: string }>, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("ID is required");

			const response = await HomePageServices.toggleActive(id);
			responseSuccess(res, 200, "Home page activated successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async delete(req: Request<{ id: string }>, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("ID is required");

			const response = await HomePageServices.delete(id);
			responseSuccess(res, 200, "Home page deleted successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getClient(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await HomePageServices.clientGet(lang);
			responseSuccess(res, 200, "Home page retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}
}
