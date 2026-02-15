import { z } from "zod";

export const reportCreateSchema = z.object({
    title_id: z.string().optional(),
    title_en: z.string().optional(),
    description_id: z.string().optional(),
    description_en: z.string().optional(),
    publish_at: z.string().transform((str) => new Date(str)), // Input string ISO -> Date
    is_publish: z
        .string()
        .transform((val) => val === "true")
        .optional(), // Handle multipart boolean
    reportCategoryId: z.string().min(1, "Category is required"),
    file_status: z.enum(["keep", "change"]).optional(),
    // News fields
    news_author: z.string().optional(),
    news_image: z.any().optional(), // Handle file upload or string url
    news_author_image: z.any().optional(), // Handle file upload or string url
    news_content_id: z.string().optional(),
    news_content_en: z.string().optional(),
});

export const reportUpdateSchema = reportCreateSchema.partial().extend({
    file_status: z.enum(["keep", "change"]).optional(),
});

export type ReportCreateInput = z.infer<typeof reportCreateSchema>;
export type ReportUpdateInput = z.infer<typeof reportUpdateSchema>;
