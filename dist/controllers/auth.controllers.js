import { customCatch } from "../utils/customCatch";
import { UserServices } from "../services/user.service";
import { responseSuccess } from "../utils/response";
import { AuthServices } from "../services/auth.services";
import { envConfig } from "../config/env.config";
export class AuthControllers {
    static async login(req, res) {
        try {
            const request = req.body;
            const isExisted = await UserServices.findUserByEmailAndPassword(request.email, request.password);
            const generateToken = AuthServices.generateToken(isExisted);
            res.cookie("token", generateToken, {
                httpOnly: true,
                secure: envConfig.node_env === "production",
                sameSite: "strict",
                path: "/",
            });
            responseSuccess(res, 200, "Login success", {
                ...isExisted,
                token: generateToken,
            });
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async logout(req, res) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
            responseSuccess(res, 200, "Logout success");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async register(req, res) {
        try {
            const request = req.body;
            const isUserExisted = await UserServices.findUserByEmail(request.email);
            if (isUserExisted)
                throw new Error("Email sudah terdaftar");
            const newUser = await UserServices.createUser({
                email: request.email,
                password: request.password,
                name: request.name,
            });
            responseSuccess(res, 201, "Register is successfully", newUser);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=auth.controllers.js.map