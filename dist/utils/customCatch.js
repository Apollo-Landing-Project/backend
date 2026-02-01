import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { responseError } from "./response";
import {} from "express";
export const customCatch = (e, res) => {
    if (e instanceof ZodError) {
        const errors = {};
        e.issues.forEach((issue) => {
            const field = issue.path.join(".") || "body";
            errors[field] = issue.message;
        });
        return responseError(res, 400, "Validation error", errors);
    }
    if (e instanceof jwt.JsonWebTokenError) {
        return responseError(res, 403, e.message);
    }
    if (e instanceof jwt.TokenExpiredError) {
        return responseError(res, 403, e.message);
    }
    if (e instanceof Error) {
        return responseError(res, 400, e.message);
    }
    return responseError(res, 500, "Internal server error");
};
//# sourceMappingURL=customCatch.js.map