import { envConfig } from "../config/env.config";
import { db } from "../lib/prisma";
import fs from "fs";
import path from "path";
import type {
    ReportCreateInput,
    ReportUpdateInput,
} from "../models/report.models";

export class ReportServices {
    static async create(data: ReportCreateInput, file: Express.Multer.File) {
        let fileUrl = null;
        if (file) {
            fileUrl = `${envConfig.host_url}/storage/files/${file.filename}`;
        }

        return await db.report.create({
            data: {
                title_id: data.title_id ?? null,
                title_en: data.title_en ?? null,
                description_id: data.description_id ?? null,
                description_en: data.description_en ?? null,
                publish_at: data.publish_at,
                is_publish: data.is_publish ?? true,
                reportCategoryId: data.reportCategoryId,
                file_url: fileUrl,
            },
        });
    }

    static async getAll(categoryId?: string) {
        const whereClause = categoryId ? { reportCategoryId: categoryId } : {};
        return await db.report.findMany({
            where: whereClause,
            include: {
                reportCategory: true,
            },
            orderBy: {
                publish_at: "desc",
            },
        });
    }

    static async getById(id: string) {
        const data = await db.report.findUnique({
            where: { id },
            include: {
                reportCategory: true,
            },
        });
        if (!data) throw new Error("Report not found");
        return data;
    }

    static async update(
        id: string,
        data: ReportUpdateInput,
        file?: Express.Multer.File,
    ) {
        const existing = await db.report.findUnique({ where: { id } });
        if (!existing) throw new Error("Report not found");

        let newFileUrl = existing.file_url;

        // Handle file changes
        if (data.file_status === "change") {
            // Delete old file if exists
            if (existing.file_url) {
                const oldFilename = existing.file_url.split("/").pop();
                if (oldFilename) {
                    const oldPath = path.join("/apollo/storage/files", oldFilename);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
            }

            // Set new file if uploaded
            if (file) {
                newFileUrl = `${envConfig.host_url}/storage/files/${file.filename}`;
            } else {
                newFileUrl = null; // Removed
            }
        }

        return await db.report.update({
            where: { id },
            data: {
                title_id: data.title_id ?? undefined,
                title_en: data.title_en ?? undefined,
                description_id: data.description_id ?? undefined,
                description_en: data.description_en ?? undefined,
                publish_at: data.publish_at ?? undefined,
                is_publish: data.is_publish ?? undefined,
                reportCategoryId: data.reportCategoryId ?? undefined,
                file_url: newFileUrl,
            } as any,
        });
    }

    static async delete(id: string) {
        const data = await db.report.findUnique({ where: { id } });
        if (!data) throw new Error("Report not found");

        // Remove file
        if (data.file_url) {
            const filename = data.file_url.split("/").pop();
            if (filename) {
                const filePath = path.join("/apollo/storage/files", filename);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        }

        return await db.report.delete({
            where: { id },
        });
    }
}
