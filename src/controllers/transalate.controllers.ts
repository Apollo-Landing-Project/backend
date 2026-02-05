import { translateSchema } from "../models/translate.models";
import { customCatch } from "../utils/customCatch";
import { responseError, responseSuccess } from "../utils/response";
import type { Request, Response } from "express";
import { z } from "zod";

export class TranslateController {
	static async translateText(req: Request, res: Response) {
		try {
			// Validasi Input
			const { texts, target_lang } = translateSchema.parse(req.body);

			// OpenL punya limit 250,000 char/month. Batasi per request max 2000 char.
			const totalChars = texts.join("").length;
			if (totalChars > 2000) {
				responseError(
					res,
					400,
					"Total characters exceed limit of 2000 per request",
				);
				return;
			}

			// Call OpenL API (RapidAPI)
			const options = {
				method: "POST",
				url: "https://openl-translate.p.rapidapi.com/translate/bulk",
				headers: {
					"x-rapidapi-key": process.env.RAPIDAPI_KEY!,
					"x-rapidapi-host": "openl-translate.p.rapidapi.com",
					"Content-Type": "application/json",
				},
				data: {
					target_lang: target_lang,
					text: texts,
				},
			};

			const response = await fetch(options.url, {
				method: options.method,
				headers: options.headers,
				body: JSON.stringify(options.data),
			}).then((res) => res.json());

			// Response OpenL: { status: "success", translated_text: ["...", "..."] }
			responseSuccess(res, 200, "Translation successful", {
				translated_text: response.translatedTexts,
			});
		} catch (error: any) {
			customCatch(error, res);
		}
	}
}
