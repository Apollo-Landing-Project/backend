import { z } from "zod";

export const carGallerySchema = z.object({
	// --- CONTENT INDONESIA ---
	title: z.string().min(1, "Car Title (ID) is required"),
	desc: z.string().min(1, "Description (ID) is required"),

	// --- CONTENT ENGLISH ---
	title_en: z.string().min(1, "Car Title (EN) is required"),
	desc_en: z.string().min(1, "Description (EN) is required"),
});

// Tipe data untuk TypeScript
export type CarGalleryInput = z.infer<typeof carGallerySchema>;
