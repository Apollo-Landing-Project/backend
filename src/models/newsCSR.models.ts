import { z } from "zod";

const jsonParse = (val: unknown) => {
    if (typeof val === "string") {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return val;
};

// --- CREATE SCHEMA ---
export const newsCSRCreateSchema = z.object({
    // Indonesia (ID)
    title: z.string().min(1, "Title (ID) is required"),
    description: z.string().optional(),
    content: z.string().min(1, "Content (ID) is required"),
    badge: z.string().optional(),

    // English (EN)
    title_en: z.string().min(1, "Title (EN) is required"),
    description_en: z.string().optional(),
    content_en: z.string().min(1, "Content (EN) is required"),
    badge_en: z.string().optional(),

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

    // Image descriptions (sent as JSON arrays via form-data)
    images_description_id: z.preprocess(
        jsonParse,
        z.array(z.string()).optional().default([]),
    ),
    images_description_en: z.preprocess(
        jsonParse,
        z.array(z.string()).optional().default([]),
    ),
});

// --- UPDATE SCHEMA ---
export const newsCSRUpdateSchema = newsCSRCreateSchema.partial().extend({
    author_image_status: z.enum(["keep", "change", "remove"]).optional().default("keep"),
    // IDs of images to delete during update
    deleted_image_ids: z.preprocess(
        jsonParse,
        z.array(z.string()).optional().default([]),
    ),
});

export type NewsCSRCreateInput = z.infer<typeof newsCSRCreateSchema>;
export type NewsCSRUpdateInput = z.infer<typeof newsCSRUpdateSchema>;
