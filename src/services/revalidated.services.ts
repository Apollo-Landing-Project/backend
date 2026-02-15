import { envConfig } from "../config/env.config";

export class RevalidatedServices {
    static async revalidated(tag: string) {
        const response = await fetch(`${envConfig.landing_url}/api/revalidated?tag=${tag}&secret=${envConfig.secret_revalidated}`);
        if (!response.ok) throw new Error("Failed to revalidated");
        return response.json();
    }
}