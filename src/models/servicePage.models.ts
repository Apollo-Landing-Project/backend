import { z } from "zod";

const jsonParse = (val: unknown) => {
	if (typeof val === "string") {
		try {
			return JSON.parse(val);
		} catch {
			return val;
		}
	}
	return val;
};

export const servicePageSchema = z.object({
	// ID
	hero_title: z.string().min(1),
	hero_desc: z.string().min(1),
	used_car_gallery_title: z.string().min(1),
	used_car_gallery_desc: z.string().min(1),
	// EN
	hero_title_en: z.string().min(1),
	hero_desc_en: z.string().min(1),
	used_car_gallery_title_en: z.string().min(1),
	used_car_gallery_desc_en: z.string().min(1),
});

export type ServicePageInput = z.infer<typeof servicePageSchema>;
