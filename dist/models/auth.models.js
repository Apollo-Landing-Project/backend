import { z } from "zod";
export const registerSchema = z.object({
    body: z.object({
        email: z.email("Email format invalid"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        name: z.string().min(1, "Nama tidak boleh kosong"),
    }),
});
export const loginSchema = z.object({
    body: z.object({
        email: z.email("Email format invalid"),
        password: z.string().min(1, "Password is required"),
    }),
});
//# sourceMappingURL=auth.models.js.map