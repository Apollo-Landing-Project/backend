import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch";
import { responseSuccess } from "../utils/response";
import { HomePageServices } from "../services/homePage.services";
import { NewsPageServices } from "../services/newsPage.services";
import {
	newsPageCreateSchema,
	newsPageUpdateSchema,
	type NewsPageUpdateInput,
} from "../models/newsPage.models";

export class NewsPageControllers {
	static async getAll(req: Request, res: Response) {
		try {
			const response = await NewsPageServices.getAll();
			responseSuccess(res, 200, "Get all news pages success", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getById(req: Request<{ id: string }>, res: Response) {
		try {
			const { id } = req.params;

			if (!id) throw new Error("ID is required");

			const response = await NewsPageServices.getById(id);
			responseSuccess(res, 200, "Get news page by ID success", response);
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

			const validatedBody = newsPageCreateSchema.parse(body);

			const response = await NewsPageServices.create(
				validatedBody,
				fileTypeDeclare,
			);

			responseSuccess(res, 201, "Create news page success", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async update(
		req: Request<{ id: string }, {}, NewsPageUpdateInput>,
		res: Response,
	) {
		try {
			const { id } = req.params;
			const { body, file } = req;

			if (!id) throw new Error("ID is required");

			const validatedBody = newsPageUpdateSchema.parse({ ...body });

			const fileTypeDeclare = file as Express.Multer.File;

			if (validatedBody.image_status === "change" && !fileTypeDeclare) {
				throw new Error("Image is required when status is 'change'");
			}

			const response = await NewsPageServices.update(
				id,
				validatedBody,
				fileTypeDeclare,
			);

			responseSuccess(res, 200, "Update news page success", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async toggleActive(req: Request<{ id: string }>, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("ID is required");

			const response = await NewsPageServices.toggleActive(id);
			responseSuccess(res, 200, "News page activated successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async delete(req: Request<{ id: string }>, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("ID is required");

			const response = await NewsPageServices.delete(id);
			responseSuccess(res, 200, "News page deleted successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getClient(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await HomePageServices.getClient(lang);
			responseSuccess(res, 200, "Home page retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}
}
