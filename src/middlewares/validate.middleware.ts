import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import { customCatch } from "../utils/customCatch";

export const validate =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (err: any) {
			customCatch(err, res);
		}
	};
