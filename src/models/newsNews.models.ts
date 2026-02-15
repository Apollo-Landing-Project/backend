import { z } from "zod";

// --- CREATE SCHEMA ---
export const newsNewsCreateSchema = z.object({
	// Indonesia (ID)
	title: z.string().min(1, "Title (ID) is required"),
	description: z.string().optional(),
	content: z.string().min(1, "Content (ID) is required"),

	// English (EN)
	title_en: z.string().min(1, "Title (EN) is required"),
	description_en: z.string().optional(),
	content_en: z.string().min(1, "Content (EN) is required"),

	// Global
	author: z.string().optional(),
	isPublished: z
		.preprocess((val) => {
			if (val === "true") return true;
			if (val === "false") return false;
			return val;
		}, z.boolean())
		.optional()
		.default(false),
});

// --- UPDATE SCHEMA ---
export const newsNewsUpdateSchema = newsNewsCreateSchema.partial().extend({
	image_status: z.enum(["keep", "change"]),
	author_image_status: z
		.enum(["keep", "change", "remove"])
		.optional()
		.default("keep"),
});

export type NewsNewsCreateInput = z.infer<typeof newsNewsCreateSchema>;
export type NewsNewsUpdateInput = z.infer<typeof newsNewsUpdateSchema>;
