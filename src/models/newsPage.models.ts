import { z } from "zod";

// --- SCHEMA CREATE ---
export const newsPageCreateSchema = z.object({
	// Image Status (Untuk logika backend handling gambar)
	image_status: z.enum(["keep", "change"]).optional(),

	// --- INDONESIA (ID) ---
	// Hero sekarang masuk sini
	hero_title: z.string().min(1, "Hero Title (ID) is required"),
	hero_desc: z.string().min(1, "Hero Desc (ID) is required"),
	news_title: z.string().min(1, "News Title (ID) is required"),
	news_desc: z.string().min(1, "News Desc (ID) is required"),
	csr_title: z.string().min(1, "CSR Title (ID) is required"),
	csr_desc: z.string().min(1, "CSR Desc (ID) is required"),

	// --- ENGLISH (EN) ---
	// Hero EN
	hero_title_en: z.string().min(1, "Hero Title (EN) is required"),
	hero_desc_en: z.string().min(1, "Hero Desc (EN) is required"),
	news_title_en: z.string().min(1, "News Title (EN) is required"),
	news_desc_en: z.string().min(1, "News Desc (EN) is required"),
	csr_title_en: z.string().min(1, "CSR Title (EN) is required"),
	csr_desc_en: z.string().min(1, "CSR Desc (EN) is required"),
});

// Update Schema (Partial)
export const newsPageUpdateSchema = newsPageCreateSchema.partial().extend({
	image_status: z.enum(["keep", "change"]),
});

export type NewsPageCreateInput = z.infer<typeof newsPageCreateSchema>;
export type NewsPageUpdateInput = z.infer<typeof newsPageUpdateSchema>;
