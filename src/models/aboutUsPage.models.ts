import { z } from "zod";

// Helper Parse JSON
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

// --- SUB SCHEMAS (LIST ITEMS) ---
const governanceItemSchema = z.object({
	id: z.string().optional(), // Ada = Update, Tidak Ada = Create
	name: z.string().min(1, "Governance Name is required"),
	position: z.enum(["BOD", "BOC"]),
	position_desc: z.string().min(1, "Position description is required"),
	// photo_index: Pointer ke array file 'governance_photos'.
	// Wajib ada jika item baru.
	photo_index: z.number().optional(),
});

const structureItemSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, "Structure Name is required"),
	// icon_index: Pointer ke array file 'company_structure_icons'
	icon_index: z.number().optional(),
});

// --- MAIN SCHEMA ---
export const aboutPageSchema = z.object({
	// --- INDONESIA (ID) ---
	hero_title: z.string().min(1),
	hero_desc: z.string().min(1),
	hero_badge: z.string().min(1),

	vision_title: z.string().min(1),
	vision_desc: z.string().min(1),
	vision_badge: z.string().min(1),
	vision_quote: z.string().optional(),
	vision_list: z.preprocess(jsonParse, z.array(z.string()).min(1)),

	mission_title: z.string().min(1),
	mission_desc: z.string().min(1),
	mission_badge: z.string().min(1),
	mission_quote: z.string().optional(),
	mission_list: z.preprocess(jsonParse, z.array(z.string()).min(1)),

	history_title: z.string().min(1),
	history_desc: z.string().min(1),
	history_badge: z.string().min(1),

	company_structure_title: z.string().min(1),
	company_structure_desc: z.string().min(1),
	company_structure_badge: z.string().min(1),
	boc_title: z.string().min(1),
	boc_desc: z.string().min(1),
	boc_badge: z.string().min(1),
	bod_title: z.string().min(1),
	bod_desc: z.string().min(1),
	bod_badge: z.string().min(1),

	// --- ENGLISH (EN) ---
	hero_title_en: z.string().min(1),
	hero_desc_en: z.string().min(1),
	hero_badge_en: z.string().min(1),

	vision_title_en: z.string().min(1),
	vision_desc_en: z.string().min(1),
	vision_badge_en: z.string().min(1),
	vision_quote_en: z.string().min(1),
	vision_list_en: z.preprocess(jsonParse, z.array(z.string()).min(1)),

	mission_title_en: z.string().min(1),
	mission_desc_en: z.string().min(1),
	mission_badge_en: z.string().min(1),
	mission_quote_en: z.string().min(1),
	mission_list_en: z.preprocess(jsonParse, z.array(z.string()).min(1)),

	history_title_en: z.string().min(1),
	history_desc_en: z.string().min(1),
	history_badge_en: z.string().min(1),

	company_structure_title_en: z.string().min(1),
	company_structure_desc_en: z.string().min(1),
	company_structure_badge_en: z.string().min(1),
	boc_title_en: z.string().min(1),
	boc_desc_en: z.string().min(1),
	boc_badge_en: z.string().min(1),
	bod_title_en: z.string().min(1),
	bod_desc_en: z.string().min(1),
	bod_badge_en: z.string().min(1),

	// --- LISTS ---
	governance_list: z.preprocess(
		jsonParse,
		z.array(governanceItemSchema).default([]),
	),
	company_structure_list: z.preprocess(
		jsonParse,
		z.array(structureItemSchema).default([]),
	),
});

export type AboutPageInput = z.infer<typeof aboutPageSchema>;
