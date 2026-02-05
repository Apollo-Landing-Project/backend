import { z } from "zod";

export const uploadImagePrefix = z.object({
	body: z.object({
		prefix: z
			.string()
			.min(2, "Prefix too short")
			.max(20, "Prefix too long")
			.regex(/^[a-zA-Z0-9-_]+$/, "Only letters, numbers, - and _ allowed"),
	}),
});
