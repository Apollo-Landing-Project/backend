import { z } from "zod";

export const reportCategoryCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});

export const reportCategoryUpdateSchema = reportCategoryCreateSchema.partial();

export type ReportCategoryCreateInput = z.infer<
    typeof reportCategoryCreateSchema
>;
export type ReportCategoryUpdateInput = z.infer<
    typeof reportCategoryUpdateSchema
>;
