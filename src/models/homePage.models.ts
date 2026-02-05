import { z } from "zod";

const toArrayString = (val: unknown) => {
	if (Array.isArray(val)) return val.map(String);
	if (typeof val === "string") return [val];
	return [];
};

const jsonParseArray = (val: unknown) => {
	if (typeof val === "string") {
		try {
			return JSON.parse(val);
		} catch {
			return [];
		}
	}
	return val;
};

// --- SCHEMA CREATE ---
export const homePageCreateSchema = z.object({
	// Numeric Fields (Coerce dari string form-data)
	about_us_years_exp: z.coerce.number().int().nonnegative(),
	about_us_products: z.coerce.number().int().nonnegative(),
	about_us_countries: z.coerce.number().int().nonnegative(),
	about_us_brands: z.coerce.number().int().nonnegative(),

	// Array Fields
	contact_email: z.preprocess(toArrayString, z.array(z.string().email())),
	contact_phone: z.preprocess(toArrayString, z.array(z.string().min(5))),

	// String Fields (ID)
	hero_title: z.string().min(1),
	hero_desc: z.string().min(1),
	about_us_title: z.string().min(1),
	about_us_desc: z.string().min(1),
	services_title: z.string().min(1),
	services_desc: z.string().min(1),
	news_title: z.string().min(1),
	news_desc: z.string().min(1),
	partners_title: z.string().min(1),
	partners_desc: z.string().min(1),
	contact_title: z.string().min(1),
	contact_desc: z.string().min(1),
	contact_address: z.string().min(1),
	contact_link_map: z.string().url(),

	// String Fields (EN)
	hero_title_en: z.string().min(1),
	hero_desc_en: z.string().min(1),
	about_us_title_en: z.string().min(1),
	about_us_desc_en: z.string().min(1),
	services_title_en: z.string().min(1),
	services_desc_en: z.string().min(1),
	news_title_en: z.string().min(1),
	news_desc_en: z.string().min(1),
	partners_title_en: z.string().min(1),
	partners_desc_en: z.string().min(1),
	contact_title_en: z.string().min(1),
	contact_desc_en: z.string().min(1),
});

// --- SCHEMA UPDATE ---
// Menggunakan .partial() agar semua field optional, tapi menambahkan validasi image_status
export const homePageUpdateSchema = homePageCreateSchema.partial().extend({
	// image_status wajib dikirim saat update (format JSON String: '["keep", "change", "keep"]')
	image_status: z.preprocess(
		jsonParseArray,
		z.array(z.enum(["keep", "change"])).length(3),
	),
});

// Export Type inference
export type HomePageCreateInput = z.infer<typeof homePageCreateSchema>;
export type HomePageUpdateInput = z.infer<typeof homePageUpdateSchema>;
