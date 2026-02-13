import type { Request, Response } from "express";
import { responseSuccess } from "../utils/response";
import { customCatch } from "../utils/customCatch";
import { ClientAllService } from "../services/clientAllPage.services";

export class ClientAllController {
	static async getHomePage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getHomePage(lang);
			responseSuccess(res, 200, "Home page retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getAboutUsPage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getAboutUsPage(lang);
			responseSuccess(res, 200, "About Us page retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getServicePage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getServicePage(lang);
			responseSuccess(res, 200, "Service page retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getNewsPage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getNewsPage(lang);
			responseSuccess(res, 200, "News page retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getNewsDetail(req: Request, res: Response) {
		try {
			const { id } = req.params as { id: string };
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getNewsDetail(id, lang);
			responseSuccess(res, 200, "News detail retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getNewsCSRDetail(req: Request, res: Response) {
		try {
			const { id } = req.params as { id: string };
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getNewsCSRDetail(id, lang);
			responseSuccess(res, 200, "News CSR detail retrieved successfully", response);
		} catch (e) {
			customCatch(e, res);
		}
	}

}
