import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config";
export class AuthServices {
    static generateToken(user) {
        const options = {
            expiresIn: "30d",
        };
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
            profile_image: user.profile_image,
        }, envConfig.jwt_secret, options);
        return token;
    }
}
//# sourceMappingURL=auth.services.js.map