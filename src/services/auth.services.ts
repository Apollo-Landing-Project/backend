import jwt from "jsonwebtoken";
import type { User } from "../../generated/prisma/client";
import { envConfig } from "../config/env.config";

export class AuthServices {
	static generateToken(user: User): string {
		const options: jwt.SignOptions = {
			expiresIn: "30d",
		};

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				role: user.role,
				profile_image: user.profile_image,
			},
			envConfig.jwt_secret,
			options,
		);

		return token;
	}
}
