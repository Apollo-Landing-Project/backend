import { db } from "../lib/prisma";
import fs from "fs";
import path from "path";
import { envConfig } from "../config/env.config";
import type {
    NewsCSRCreateInput,
    NewsCSRUpdateInput,
} from "../models/newsCSR.models";

const IMAGE_DIR = "/apollo/storage/images";

const deleteFile = (url: string | null | undefined) => {
    if (!url) return;
    const filename = url.split("/").pop();
    if (filename) {
        const filePath = path.join(IMAGE_DIR, filename);
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch { }
        }
    }
};

const getFileUrl = (file?: Express.Multer.File) =>
    file ? `${envConfig.host_url}/storage/images/${file.filename}` : null;

export class NewsCSRServices {
    static async create(
        data: NewsCSRCreateInput,
        imageFiles: Express.Multer.File[],
        authorImageFile?: Express.Multer.File,
    ) {
        const author_image = getFileUrl(authorImageFile);

        // Build CSR image data with descriptions
        const csrImages = imageFiles.map((file, index) => ({
            image: `${envConfig.host_url}/storage/images/${file.filename}`,
            description_id: data.images_description_id?.[index] ?? null,
            description_en: data.images_description_en?.[index] ?? null,
        }));

        return await db.newsCSR.create({
            data: {
                author: data.author ?? null,
                author_image,
                isPublished: data.isPublished ?? false,
                newsCSRId: {
                    create: {
                        title: data.title,
                        description: data.description ?? null,
                        content: data.content,
                        badge: data.badge ?? null,
                    },
                },
                newsCSREn: {
                    create: {
                        title: data.title_en,
                        description: data.description_en ?? null,
                        content: data.content_en,
                        badge: data.badge_en ?? null,
                    },
                },
                newsCSRImage: {
                    create: csrImages,
                },
            },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
    }

    static async getAll() {
        return await db.newsCSR.findMany({
            orderBy: { publishedAt: "desc" },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
    }

    static async getById(id: string) {
        const data = await db.newsCSR.findUnique({
            where: { id },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
        if (!data) throw new Error("CSR News not found");
        return data;
    }

    static async update(
        id: string,
        data: NewsCSRUpdateInput,
        newImageFiles: Express.Multer.File[],
        authorImageFile?: Express.Multer.File,
    ) {
        const existing = await db.newsCSR.findUnique({
            where: { id },
            include: { newsCSRImage: true },
        });
        if (!existing) throw new Error("CSR News not found");

        // Handle author image
        let newAuthorImage: string | null = existing.author_image;
        if (data.author_image_status === "change") {
            deleteFile(existing.author_image);
            newAuthorImage = getFileUrl(authorImageFile);
        } else if (data.author_image_status === "remove") {
            deleteFile(existing.author_image);
            newAuthorImage = null;
        }

        // Delete specified images
        const deletedImageIds = data.deleted_image_ids ?? [];
        if (deletedImageIds.length > 0) {
            const imagesToDelete = existing.newsCSRImage.filter((img) =>
                deletedImageIds.includes(img.id),
            );
            for (const img of imagesToDelete) {
                deleteFile(img.image);
            }
            await db.newsCSRImage.deleteMany({
                where: { id: { in: deletedImageIds } },
            });
        }

        // Add new images
        const newImages = newImageFiles.map((file, index) => ({
            image: `${envConfig.host_url}/storage/images/${file.filename}`,
            description_id: data.images_description_id?.[index] ?? null,
            description_en: data.images_description_en?.[index] ?? null,
            newsCSRId: id,
        }));

        if (newImages.length > 0) {
            await db.newsCSRImage.createMany({ data: newImages });
        }

        // Build update payloads, only including defined fields
        const idUpdate: Record<string, string | null> = {};
        if (data.title !== undefined) idUpdate.title = data.title;
        if (data.description !== undefined) idUpdate.description = data.description;
        if (data.content !== undefined) idUpdate.content = data.content;
        if (data.badge !== undefined) idUpdate.badge = data.badge ?? null;

        const enUpdate: Record<string, string | null> = {};
        if (data.title_en !== undefined) enUpdate.title = data.title_en;
        if (data.description_en !== undefined) enUpdate.description = data.description_en;
        if (data.content_en !== undefined) enUpdate.content = data.content_en;
        if (data.badge_en !== undefined) enUpdate.badge = data.badge_en ?? null;

        return await db.newsCSR.update({
            where: { id },
            data: {
                ...(data.author !== undefined ? { author: data.author } : {}),
                author_image: newAuthorImage,
                ...(data.isPublished !== undefined ? { isPublished: data.isPublished } : {}),
                ...(Object.keys(idUpdate).length > 0 ? { newsCSRId: { update: idUpdate } } : {}),
                ...(Object.keys(enUpdate).length > 0 ? { newsCSREn: { update: enUpdate } } : {}),
            },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
    }

    static async delete(id: string) {
        const existing = await db.newsCSR.findUnique({
            where: { id },
            include: { newsCSRImage: true },
        });
        if (!existing) throw new Error("CSR News not found");

        // Delete all image files
        deleteFile(existing.author_image);
        for (const img of existing.newsCSRImage) {
            deleteFile(img.image);
        }

        // Cascade delete handles relations
        return await db.newsCSR.delete({ where: { id } });
    }

    static async togglePublish(id: string) {
        const existing = await db.newsCSR.findUnique({ where: { id } });
        if (!existing) throw new Error("CSR News not found");

        return await db.newsCSR.update({
            where: { id },
            data: { isPublished: !existing.isPublished },
        });
    }
}
