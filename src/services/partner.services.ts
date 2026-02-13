import { db } from "../lib/prisma";
import fs from "fs";
import path from "path";
import "dotenv/config";
import type { PartnerInput } from "../models/partner.models";

// --- HELPERS ---
const deleteFile = (url: string | null) => {
    if (!url) return;
    const filename = url.split("/").pop();
    if (filename) {
        const filePath = path.join(process.cwd(), "storage/images", filename);
        if (fs.existsSync(filePath))
            try {
                fs.unlinkSync(filePath);
            } catch { }
    }
};

const getFileUrl = (file?: Express.Multer.File) =>
    file ? `${process.env.HOST_URL}/storage/images/${file.filename}` : null;

export class PartnerService {
    // --- GET ALL ---
    static async getAll() {
        return await db.partner.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    // --- GET BY ID ---
    static async getById(id: string) {
        const data = await db.partner.findUnique({ where: { id } });
        if (!data) throw new Error("Partner not found");
        return data;
    }

    // --- CREATE ---
    static async create(data: PartnerInput, file?: Express.Multer.File) {
        const logo_image = getFileUrl(file);

        return await db.partner.create({
            data: {
                name: data.name,
                logo_image,
                category: data.category,
            },
        });
    }

    // --- UPDATE ---
    static async update(
        id: string,
        data: PartnerInput,
        file?: Express.Multer.File,
    ) {
        const existing = await this.getById(id);

        let logo_image = existing.logo_image;

        if (file) {
            deleteFile(existing.logo_image);
            logo_image = getFileUrl(file);
        }

        return await db.partner.update({
            where: { id },
            data: {
                name: data.name,
                logo_image,
                category: data.category,
            },
        });
    }

    // --- DELETE ---
    static async delete(id: string) {
        const existing = await this.getById(id);
        deleteFile(existing.logo_image);
        return await db.partner.delete({ where: { id } });
    }
}
