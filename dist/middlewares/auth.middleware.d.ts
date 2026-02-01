import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "../models/auth.models";
export declare function verifyToken(req: Request & {
    user?: JwtPayload;
}, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.middleware.d.ts.map