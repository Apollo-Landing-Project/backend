import { z } from "zod";

export const partnerSchema = z.object({
    name: z.string().min(1, "Partner name is required"),
    category: z.enum(["INSURANCE", "FUNDING"]).default("INSURANCE"),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
