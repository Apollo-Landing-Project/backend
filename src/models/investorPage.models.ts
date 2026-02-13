import { z } from "zod";

// --- SCHEMA CREATE ---
export const investorPageCreateSchema = z.object({
    // Image Status (Untuk logika backend handling gambar)
    image_status: z.enum(["keep", "change"]).optional(),

    // --- INDONESIA (ID) ---
    hero_title: z.string().min(1, "Hero Title (ID) is required"),
    hero_desc: z.string().min(1, "Hero Desc (ID) is required"),
    shareholders_title: z.string().min(1, "Shareholders Title (ID) is required"),
    shareholders_desc: z.string().min(1, "Shareholders Desc (ID) is required"),

    // --- ENGLISH (EN) ---
    hero_title_en: z.string().min(1, "Hero Title (EN) is required"),
    hero_desc_en: z.string().min(1, "Hero Desc (EN) is required"),
    shareholders_title_en: z.string().min(1, "Shareholders Title (EN) is required"),
    shareholders_desc_en: z.string().min(1, "Shareholders Desc (EN) is required"),
});

// Update Schema (Partial)
export const investorPageUpdateSchema = investorPageCreateSchema.partial().extend({
    image_status: z.enum(["keep", "change"]),
});

export type InvestorPageCreateInput = z.infer<typeof investorPageCreateSchema>;
export type InvestorPageUpdateInput = z.infer<typeof investorPageUpdateSchema>;
