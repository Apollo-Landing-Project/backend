import { db } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import { envConfig } from "../config/env.config.js";
import type {
	NewsNewsCreateInput,
	NewsNewsUpdateInput,
} from "../models/newsNews.models.js";

const IMAGE_DIR = "/apollo/storage/images";

const deleteFile = (url: string | null | undefined) => {
	if (!url) return;
	const filename = url.split("/").pop();
	if (filename) {
		const filePath = path.join(IMAGE_DIR, filename);
		if (fs.existsSync(filePath)) {
			try {
				fs.unlinkSync(filePath);
			} catch {}
		}
	}
};

const getFileUrl = (file?: Express.Multer.File) =>
	file ? `${envConfig.host_url}/storage/images/${file.filename}` : null;

export class NewsNewsServices {
	static async create(
		data: NewsNewsCreateInput,
		imageFile?: Express.Multer.File,
		authorImageFile?: Express.Multer.File,
	) {
		const image = getFileUrl(imageFile);
		const author_image = getFileUrl(authorImageFile);

		return await db.newsNews.create({
			data: {
				image,
				author: data.author ?? null,
				author_image,
				isPublished: data.isPublished ?? false,
				newsNewsId: {
					create: {
						title: data.title,
						description: data.description ?? null,
						content: data.content,
					},
				},
				newsNewsEn: {
					create: {
						title: data.title_en,
						description: data.description_en ?? null,
						content: data.content_en,
					},
				},
			},
			include: {
				newsNewsId: true,
				newsNewsEn: true,
			},
		});
	}

	static async getAll() {
		return await db.newsNews.findMany({
			orderBy: { publishedAt: "desc" },
			include: {
				newsNewsId: true,
				newsNewsEn: true,
			},
		});
	}

	static async getById(id: string) {
		const data = await db.newsNews.findUnique({
			where: { id },
			include: {
				newsNewsId: true,
				newsNewsEn: true,
			},
		});
		if (!data) throw new Error("News not found");
		return data;
	}

	static async update(
		id: string,
		data: NewsNewsUpdateInput,
		imageFile?: Express.Multer.File,
		authorImageFile?: Express.Multer.File,
	) {
		const existing = await db.newsNews.findUnique({ where: { id } });
		if (!existing) throw new Error("News not found");

		// Handle main image
		let newImage: string | null = existing.image;
		if (data.image_status === "change") {
			deleteFile(existing.image);
			newImage = getFileUrl(imageFile);
		}

		// Handle author image
		let newAuthorImage: string | null = existing.author_image;
		if (data.author_image_status === "change") {
			deleteFile(existing.author_image);
			newAuthorImage = getFileUrl(authorImageFile);
		} else if (data.author_image_status === "remove") {
			deleteFile(existing.author_image);
			newAuthorImage = null;
		}

		return await db.newsNews.update({
			where: { id },
			data: {
				image: newImage,
				author: data.author ?? null,
				author_image: newAuthorImage,
				isPublished: data.isPublished ?? false,
				newsNewsId: {
					update: {
						title: data.title ?? null,
						description: data.description ?? null,
						content: data.content ?? null,
					},
				},
				newsNewsEn: {
					update: {
						title: data.title_en ?? null,
						description: data.description_en ?? null,
						content: data.content_en ?? null,
					},
				},
			},
			include: {
				newsNewsId: true,
				newsNewsEn: true,
			},
		});
	}

	static async delete(id: string) {
		const existing = await db.newsNews.findUnique({ where: { id } });
		if (!existing) throw new Error("News not found");

		// Delete image files
		deleteFile(existing.image);
		deleteFile(existing.author_image);

		return await db.newsNews.delete({ where: { id } });
	}

	static async togglePublish(id: string) {
		const existing = await db.newsNews.findUnique({ where: { id } });
		if (!existing) throw new Error("News not found");

		return await db.newsNews.update({
			where: { id },
			data: { isPublished: !existing.isPublished },
		});
	}

	/**
	 * Upload an inline image for rich text content.
	 * Returns the URL of the uploaded image.
	 */
	static async uploadContentImage(file: Express.Multer.File) {
		const url = getFileUrl(file);
		if (!url) throw new Error("File upload failed");
		return { url };
	}
}
