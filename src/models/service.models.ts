import { z } from "zod";

// Helper: Parse JSON string aman (Return array kosong jika gagal)
const jsonParse = (val: unknown) => {
	if (typeof val === "string") {
		try {
			const parsed = JSON.parse(val);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}
	return val; // Jika sudah array, kembalikan langsung
};

// Helper: Parse Number aman (Handle empty string/undefined jadi undefined biar optional jalan)
const numberParse = (val: unknown) => {
	if (val === "" || val === undefined || val === null) return undefined;
	const n = Number(val);
	return isNaN(n) ? undefined : n;
};

export const serviceItemSchema = z.object({
	// ID
	title: z.string().min(1, "Title is required"),
	desc: z.string().min(1, "Description is required"),
	desc_sort: z.string().min(1, "Description Sort (ID) is required"),
	badge: z.string().optional(),

	// Quote biasanya opsional, jadi kita izinkan string kosong atau undefined
	quote: z.string().or(z.literal("")),

	location: z.string().min(1, "Location is required"),

	// Array String (Contact & Email)
	contact: z.preprocess(jsonParse, z.array(z.string())),
	email: z.preprocess(
		jsonParse,
		z.array(z.string().email("Invalid email format")),
	),

	// EN
	title_en: z.string().min(1, "Title (EN) is required"),
	desc_en: z.string().min(1, "Description (EN) is required"),
	desc_sort_en: z.string().min(1, "Description Sort (EN) is required"),
	badge_en: z.string().optional(),
	quote_en: z.string().or(z.literal("")),
	location_en: z.string().min(1, "Location (EN) is required"),

	// Meta (Order)
	// Fix: Preprocess cek dulu apakah valuenya valid number
	order: z.preprocess(numberParse, z.number().optional().default(0)),

	// Image Index (Untuk mapping file upload)
	image_index: z.preprocess(numberParse, z.number().optional()),

	// ID untuk Update (Optional)
	id: z.string().optional(),
	id_en: z.string().optional(),
});

export type ServiceItemInput = z.infer<typeof serviceItemSchema>;

export const carGallerySchema = z.object({
	// ID
	title: z.string().min(1),
	desc: z.string().min(1),
	// EN
	title_en: z.string().min(1),
	desc_en: z.string().min(1),
});

export type CarGalleryInput = z.infer<typeof carGallerySchema>;
