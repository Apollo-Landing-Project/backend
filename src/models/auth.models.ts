import { z } from "zod";

export const registerSchema = z.object({
	body: z.object({
		email: z.email("Email format invalid"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		name: z.string().min(1, "Nama tidak boleh kosong"),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		email: z.email("Email format invalid"),
		password: z.string().min(1, "Password is required"),
	}),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];

export interface JwtPayload {
	id: number;
	email: string;
	role: string;
	profile_image: string | null;
}
