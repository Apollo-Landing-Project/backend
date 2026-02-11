import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { responseError } from "./response";
import { type Response } from "express";

export const customCatch = (e: unknown, res: Response) => {
	if (e instanceof ZodError) {
		const errors: Record<string, string> = {};

		e.issues.forEach((issue) => {
			let field = issue.path.join(".");
			if (field.startsWith("body.")) {
				field = field.replace("body.", "");
			}

			errors[field] = issue.message;
		});
		console.log(errors);

		return responseError(res, 400, "Validation error", errors);
	}

	if (e instanceof jwt.JsonWebTokenError) {
		console.log(e.message);
		return responseError(res, 403, e.message);
	}

	if (e instanceof jwt.TokenExpiredError) {
		console.log(e.message);
		return responseError(res, 403, e.message);
	}

	if (e instanceof Error) {
		console.log(e.message);
		return responseError(res, 400, e.message);
	}

	return responseError(res, 500, "Internal server error");
};
