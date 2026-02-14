import { z } from "zod";

// --- SCHEMA CREATE ---
export const investorPageCreateSchema = z.object({
    // Image Status (Untuk logika backend handling gambar)
    image_status: z.enum(["keep", "change"]).optional(),

    // --- INDONESIA (ID) ---
    hero_title: z.string().min(1, "Hero Title (ID) is required"),
    hero_desc: z.string().min(1, "Hero Desc (ID) is required"),
    hero_badge: z.string().min(1),
    stakeholders_title: z.string().min(1, "Stakeholders Title (ID) is required"),
    stakeholders_desc: z.string().min(1, "Stakeholders Desc (ID) is required"),
    stakeholders_badge: z.string().min(1),
    report_title: z.string().min(1, "Report Title (ID) is required"),
    report_desc: z.string().min(1, "Report Desc (ID) is required"),
    report_badge: z.string().min(1),

    // --- ENGLISH (EN) ---
    hero_title_en: z.string().min(1, "Hero Title (EN) is required"),
    hero_desc_en: z.string().min(1, "Hero Desc (EN) is required"),
    hero_badge_en: z.string().min(1),
    stakeholders_title_en: z.string().min(1, "Stakeholders Title (EN) is required"),
    stakeholders_desc_en: z.string().min(1, "Stakeholders Desc (EN) is required"),
    stakeholders_badge_en: z.string().min(1),
    report_title_en: z.string().min(1, "Report Title (EN) is required"),
    report_desc_en: z.string().min(1, "Report Desc (EN) is required"),
    report_badge_en: z.string().min(1),
});

// Update Schema (Partial)
export const investorPageUpdateSchema = investorPageCreateSchema.partial().extend({
    image_status: z.enum(["keep", "change"]),
});

export type InvestorPageCreateInput = z.infer<typeof investorPageCreateSchema>;
export type InvestorPageUpdateInput = z.infer<typeof investorPageUpdateSchema>;
