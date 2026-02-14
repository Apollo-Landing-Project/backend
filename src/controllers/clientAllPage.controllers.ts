import type { Request, Response } from "express";
import {
	responseSuccess,
	responseSuccessWithMetadata,
} from "../utils/response";
import { customCatch } from "../utils/customCatch";
import { ClientAllService } from "../services/clientAllPage.services";
import { db } from "../lib/prisma";

export class ClientAllController {
	static async getHomePage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getHomePage(lang);
			const metadatafilter = await ClientAllService.getMetadata(
				lang,
				"homepage",
			);
			responseSuccessWithMetadata(
				res,
				200,
				"Home page retrieved successfully",
				response,
				{ ...metadatafilter, og_image: response.hero[0]?.background },
			);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getAboutUsPage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getAboutUsPage(lang);
			const metadatafilter = await ClientAllService.getMetadata(
				lang,
				"aboutuspage",
			);
			responseSuccessWithMetadata(
				res,
				200,
				"About Us page retrieved successfully",
				response,
				{ ...metadatafilter, og_image: response.hero.background },
			);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getServicePage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getServicePage(lang);
			const metadatafilter = await ClientAllService.getMetadata(
				lang,
				"servicepage",
			);
			responseSuccessWithMetadata(
				res,
				200,
				"Service page retrieved successfully",
				response,
				{ ...metadatafilter, og_image: response.hero.background },
			);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getNewsPage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getNewsPage(lang);
			const metadatafilter = await ClientAllService.getMetadata(
				lang,
				"newspage",
			);

			responseSuccessWithMetadata(
				res,
				200,
				"News page retrieved successfully",
				response,
				{ ...metadatafilter, og_image: response.hero.background },
			);
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

			const date = new Date(response.publishedAt);
			const monthsId = [
				"Januari",
				"Februari",
				"Maret",
				"April",
				"Mei",
				"Juni",
				"Juli",
				"Agustus",
				"September",
				"Oktober",
				"November",
				"Desember",
			];
			const monthsEn = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			const monthName =
				lang === "id" ? monthsId[date.getMonth()] : monthsEn[date.getMonth()];
			const formattedDate = `${date.getDate()} ${monthName} ${date.getFullYear()}`;

			const metadata = {
				title: lang === "id" ? "Berita Terbaru" : "Latest News",
				description:
					lang === "id" ?
						`${response.title} diposting pada tanggal ${formattedDate}`
					:	`${response.title} posted on ${formattedDate}`,
				og_image: response.image,
			};

			responseSuccessWithMetadata(
				res,
				200,
				"News detail retrieved successfully",
				response,
				metadata,
			);
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

			const date = new Date(response.publishedAt);
			const monthsId = [
				"Januari",
				"Februari",
				"Maret",
				"April",
				"Mei",
				"Juni",
				"Juli",
				"Agustus",
				"September",
				"Oktober",
				"November",
				"Desember",
			];
			const monthsEn = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			const monthName =
				lang === "id" ? monthsId[date.getMonth()] : monthsEn[date.getMonth()];
			const formattedDate = `${date.getDate()} ${monthName} ${date.getFullYear()}`;

			const metadata = {
				title: lang === "id" ? "Berita Terbaru" : "Latest News",
				description:
					lang === "id" ?
						`${response.title} diposting pada tanggal ${formattedDate}`
					:	`${response.title} posted on ${formattedDate}`,
				og_image: response.image[0]?.image,
			};

			responseSuccessWithMetadata(
				res,
				200,
				"News CSR detail retrieved successfully",
				response,
				metadata,
			);
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async getInvestorRelationPage(req: Request, res: Response) {
		try {
			const { lang } = req.query as { lang?: string };
			if (!lang) throw new Error("Language is required");

			const response = await ClientAllService.getInvestorRelationPage(lang);

			const metadata = await ClientAllService.getMetadata(lang, "investorpage");
			responseSuccessWithMetadata(
				res,
				200,
				"Investor Relation page retrieved successfully",
				response,
				{ ...metadata, og_image: response.hero.background },
			);
		} catch (e) {
			customCatch(e, res);
		}
	}
}
