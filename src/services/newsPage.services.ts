import { envConfig } from "../config/env.config";
import { db } from "../lib/prisma";
import fs from "fs";
import path from "path";
import type { NewsPageCreateInput } from "../models/newsPage.models";

export class NewsPageServices {
	static async create(
		data: NewsPageCreateInput,
		file_image: Express.Multer.File,
	) {
		const newNewsPage = await db.newsPage.create({
			data: {
				hero_bg: `${envConfig.host_url}/storage/images/${file_image.filename}`,
				newsPageId: {
					create: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						news_title: data.news_title,
						news_desc: data.news_desc,
						csr_title: data.csr_title,
						csr_desc: data.csr_desc,
					},
				},
				newsPageEn: {
					create: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						news_title: data.news_title_en,
						news_desc: data.news_desc_en,
						csr_title: data.csr_title_en,
						csr_desc: data.csr_desc_en,
					},
				},
			},
		});
		return newNewsPage;
	}
	static async getAll() {
		return await db.newsPage.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				newsPageEn: true,
				newsPageId: true,
			},
		});
	}

	static async getById(id: string) {
		const data = await db.newsPage.findUnique({
			where: { id },
			include: {
				newsPageId: true,
				newsPageEn: true,
			},
		});
		if (!data) throw new Error("News page not found");
		return data;
	}

	static async toggleActive(id: string) {
		return await db.$transaction(async (tx) => {
			await tx.newsPage.updateMany({ data: { isActive: false } });
			return await tx.newsPage.update({
				where: { id },
				data: { isActive: true },
			});
		});
	}

	static async delete(id: string) {
		const data = await db.newsPage.findUnique({ where: { id } });
		if (!data) throw new Error("Not found");

		// Hapus file fisik
		const filename = data.hero_bg?.split("/").pop();
		if (filename) {
			const filePath = path.join("/apollo/storage/images", filename);
			if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
		}

		return await db.$transaction(async (tx) => {
			await tx.newsPageId.delete({ where: { newsPageId: id } });
			await tx.newsPageEn.delete({ where: { newsPageId: id } });
			await tx.newsPage.delete({ where: { id } });
		});
	}

	static async update(id: string, data: any, file: Express.Multer.File) {
		const existing = await db.newsPage.findUnique({ where: { id } });
		if (!existing) throw new Error("Not found");

		let newHeroBg: string | null = existing.hero_bg;

		if (data.image_status === "change") {
			const oldUrl = existing.hero_bg;
			if (oldUrl) {
				const oldFilename = oldUrl.split("/").pop();
				if (oldFilename) {
					const oldPath = path.join("/apollo/storage/images", oldFilename);
					if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
				}
			}
			if (file) {
				newHeroBg = `${envConfig.host_url}/storage/images/${file.filename}`;
			}
		}

		return await db.newsPage.update({
			where: { id },
			data: {
				hero_bg: newHeroBg,
				newsPageId: {
					update: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						news_title: data.news_title,
						news_desc: data.news_desc,
						csr_title: data.csr_title,
						csr_desc: data.csr_desc,
					},
				},
				newsPageEn: {
					update: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						news_title: data.news_title_en,
						news_desc: data.news_desc_en,
						csr_title: data.csr_title_en,
						csr_desc: data.csr_desc_en,
					},
				},
			},
		});
	}
}
