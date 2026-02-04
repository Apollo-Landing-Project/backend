import type { Request, Response } from "express";
import { customCatch } from "../utils/customCatch";
import type { LoginInput, RegisterInput } from "../models/auth.models";
import { UserServices } from "../services/user.service";
import { responseSuccess } from "../utils/response";
import { AuthServices } from "../services/auth.services";
import { envConfig } from "../config/env.config";

export class AuthControllers {
	private static getCookieOptions() {
		const isProd = process.env.NODE_ENV === "production";

		return {
			httpOnly: true,
			secure: isProd,
			sameSite: "lax" as const,
			path: "/",
			...(isProd && {
				domain: envConfig.cookie_domain || ".evaluasipembelajaran.site",
			}),
		};
	}
	static async login(req: Request, res: Response) {
		try {
			const request: LoginInput = req.body;
			const isExisted = await UserServices.findUserByEmailAndPassword(
				request.email,
				request.password,
			);
			const generateToken = AuthServices.generateToken(isExisted);

			res.cookie("token", generateToken, AuthControllers.getCookieOptions());

			responseSuccess(res, 200, "Login success", {
				...isExisted,
				token: generateToken,
			});
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async logout(req: Request, res: Response) {
		try {
			res.clearCookie("token", AuthControllers.getCookieOptions());

			responseSuccess(res, 200, "Logout success");
		} catch (e) {
			customCatch(e, res);
		}
	}

	static async register(req: Request, res: Response) {
		try {
			const request: RegisterInput = req.body;

			const isUserExisted = await UserServices.findUserByEmail(request.email);
			if (isUserExisted) throw new Error("Email sudah terdaftar");

			const newUser = await UserServices.createUser({
				email: request.email,
				password: request.password,
				name: request.name,
			});

			responseSuccess(res, 201, "Register is successfully", newUser);
		} catch (e) {
			customCatch(e, res);
		}
	}
}
