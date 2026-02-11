import { db } from "../lib/prisma";
import fs from "fs";
import path from "path";
import "dotenv/config";
import type { ServicePageInput } from "../models/servicePage.models";

const deleteFile = (url: string | null) => {
	if (!url) return;
	const filename = url.split("/").pop();
	if (filename) {
		const filePath = path.join(process.cwd(), "storage/images", filename);
		if (fs.existsSync(filePath))
			try {
				fs.unlinkSync(filePath);
			} catch {}
	}
};

const getFileUrl = (file?: Express.Multer.File) =>
	file ? `${process.env.HOST_URL}/storage/images/${file.filename}` : null;

export class ServicePageService {
	static async getAll() {
		return await db.servicePage.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				servicePageId: true,
				servicePageEn: true,
			},
		});
	}

	static async getById(id: string) {
		const data = await db.servicePage.findUnique({
			where: { id },
			include: { servicePageId: true, servicePageEn: true },
		});
		if (!data) throw new Error("Page not found");
		return data;
	}

	static async create(data: ServicePageInput, file?: Express.Multer.File) {
		const hero_bg = getFileUrl(file);
		if (!hero_bg)
			throw new Error("Hero background image is required for new page");

		return await db.servicePage.create({
			data: {
				hero_bg,
				isActive: false,
				servicePageId: {
					create: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						used_car_gallery_title: data.used_car_gallery_title,
						used_car_gallery_desc: data.used_car_gallery_desc,
					},
				},
				servicePageEn: {
					create: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						used_car_gallery_title: data.used_car_gallery_title_en,
						used_car_gallery_desc: data.used_car_gallery_desc_en,
					},
				},
			},
		});
	}

	static async update(
		id: string,
		data: ServicePageInput,
		file?: Express.Multer.File,
	) {
		const existing = await db.servicePage.findUnique({ where: { id } });
		if (!existing) throw new Error("Page not found");

		let hero_bg = existing.hero_bg;

		if (file) {
			deleteFile(existing.hero_bg);
			hero_bg = getFileUrl(file);
		}

		return await db.servicePage.update({
			where: { id },
			data: {
				hero_bg,
				servicePageId: {
					update: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						used_car_gallery_title: data.used_car_gallery_title,
						used_car_gallery_desc: data.used_car_gallery_desc,
					},
				},
				servicePageEn: {
					update: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						used_car_gallery_title: data.used_car_gallery_title_en,
						used_car_gallery_desc: data.used_car_gallery_desc_en,
					},
				},
			},
			include: { servicePageId: true, servicePageEn: true },
		});
	}

	static async toggleActive(id: string) {
		return await db.$transaction(async (tx) => {
			await tx.servicePage.updateMany({ data: { isActive: false } });

			return await tx.servicePage.update({
				where: { id },
				data: { isActive: true },
			});
		});
	}

	// --- DELETE ---
	static async delete(id: string) {
		const data = await db.servicePage.findUnique({
			where: { id },
			include: { servicePageId: true, servicePageEn: true },
		});

		if (!data) throw new Error("Page not found");

		deleteFile(data.hero_bg);
		await db.servicePageId.delete({ where: { servicePageId: id } });
		await db.servicePageEn.delete({ where: { servicePageId: id } });

		return await db.servicePage.delete({ where: { id } });
	}
}
