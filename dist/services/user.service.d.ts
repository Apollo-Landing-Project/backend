import type { User } from "../../generated/prisma/client";
export declare class UserServices {
    static findUserByEmail(email: string): Promise<User | null>;
    static findUserByEmailAndPassword(email: string, password: string): Promise<User>;
    static createUser({ email, password, name, }: {
        email: string;
        password: string;
        name: string;
    }): Promise<any>;
}
//# sourceMappingURL=user.service.d.ts.map