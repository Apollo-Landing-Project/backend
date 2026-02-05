import { z } from "zod";

export const translateSchema = z.object({
	texts: z.array(z.string()).min(1).max(20), // Max 20 item per request
	target_lang: z.enum(["en", "id"]), // Hanya support ke EN atau ID
});
