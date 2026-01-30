import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../models/auth.models";
import { envConfig } from "../config/env.config";
import { customCatch } from "../utils/customCatch";

export function verifyToken(
	req: Request & { user?: JwtPayload },
	res: Response,
	next: NextFunction,
) {
	try {
		const token = req.cookies["token"];

		if (!token) {
			throw new Error("No token provided");
		}

		const decoded = jwt.verify(token, envConfig.jwt_secret) as JwtPayload;

		req.user = decoded;

		next();
	} catch (e) {
		customCatch(e, res);
	}
}
