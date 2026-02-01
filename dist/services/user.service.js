import bcrypt from "bcryptjs";
import { db } from "../lib/prisma";
export class UserServices {
    static async findUserByEmail(email) {
        const isExisted = await db.user.findUnique({
            where: {
                email,
            },
        });
        return isExisted;
    }
    static async findUserByEmailAndPassword(email, password) {
        const isExisted = await db.user.findUnique({
            where: {
                email,
            },
        });
        if (!isExisted)
            throw new Error(`User dengan email ${email} tidak ditemukan`);
        const match = await bcrypt.compare(password, isExisted.password);
        if (!match)
            throw new Error("Password is not match");
        return isExisted;
    }
    static async createUser({ email, password, name, }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
    }
}
//# sourceMappingURL=user.service.js.map