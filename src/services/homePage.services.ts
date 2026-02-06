import { envConfig } from "../config/env.config";
import { db } from "../lib/prisma";
import type { HomePageCreateInput } from "../models/homePage.models";
import fs from "fs";
import path from "path";

export class HomePageServices {
	static async create(
		data: HomePageCreateInput,
		file_image: Express.Multer.File[],
	) {
		const newHomePage = await db.homePage.create({
			data: {
				hero_bg: file_image.map(
					(file) => `${envConfig.host_url}/storage/image/${file.filename}`,
				),
				about_us_brands: Number(data.about_us_brands),
				about_us_countries: Number(data.about_us_countries),
				about_us_products: Number(data.about_us_products),
				about_us_years_exp: Number(data.about_us_years_exp),
				contact_email: data.contact_email,
				contact_phone: data.contact_phone,
				contact_link_map: data.contact_link_map,
				contact_address: data.contact_address,
				homePageEn: {
					create: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						about_us_title: data.about_us_title_en,
						about_us_desc: data.about_us_desc_en,
						services_title: data.services_title_en,
						services_desc: data.services_desc_en,
						news_title: data.news_title_en,
						news_desc: data.news_desc_en,
						contact_title: data.contact_title_en,
						contact_desc: data.contact_desc_en,
						partners_title: data.partners_title_en,
						partners_desc: data.partners_desc_en,
					},
				},
				homePageId: {
					create: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						about_us_title: data.about_us_title,
						about_us_desc: data.about_us_desc,
						services_title: data.services_title,
						services_desc: data.services_desc,
						news_title: data.news_title,
						news_desc: data.news_desc,
						contact_title: data.contact_title,
						contact_desc: data.contact_desc,
						partners_title: data.partners_title,
						partners_desc: data.partners_desc,
					},
				},
			},
		});
		return newHomePage;
	}

	static async getAll() {
		return await db.homePage.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				homePageId: true,
				homePageEn: true,
			},
		});
	}

	static async getById(id: string) {
		const data = await db.homePage.findUnique({
			where: { id },
			include: {
				homePageId: true,
				homePageEn: true,
			},
		});
		if (!data) throw new Error("Home Page not found");
		return data;
	}

	static async toggleActive(id: string) {
		return await db.$transaction(async (tx) => {
			await tx.homePage.updateMany({ data: { isActive: false } });
			return await tx.homePage.update({
				where: { id },
				data: { isActive: true },
			});
		});
	}

	static async delete(id: string) {
		const data = await db.homePage.findUnique({ where: { id } });
		if (!data) throw new Error("Not found");

		// Hapus file fisik
		data.hero_bg.forEach((url) => {
			const filename = url.split("/").pop();
			if (filename) {
				const filePath = path.join("/apollo/storage/images", filename);
				if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
			}
		});

		return await db.homePage.delete({ where: { id } });
	}

	static async update(id: string, data: any, files: Express.Multer.File[]) {
		const existing = await db.homePage.findUnique({ where: { id } });
		if (!existing) throw new Error("Not found");

		let newHeroBg: string[] = [...existing.hero_bg];
		const imageStatus =
			Array.isArray(data.image_status) ?
				data.image_status
			:	JSON.parse(data.image_status || '["keep","keep","keep"]');

		let fileIndex = 0;

		// Loop 3 slot gambar
		for (let i = 0; i < 3; i++) {
			if (imageStatus[i] === "change") {
				// 1. Hapus gambar lama di index ini
				const oldUrl = existing.hero_bg[i];
				if (oldUrl) {
					const oldFilename = oldUrl.split("/").pop();
					if (oldFilename) {
						const oldPath = path.join("/apollo/storage/images", oldFilename);
						if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
					}
				}

				const newFile = files[fileIndex];
				if (newFile) {
					newHeroBg[i] = `${process.env.HOST_URL}/images/${newFile.filename}`;
					fileIndex++;
				}
			}
		}

		return await db.homePage.update({
			where: { id },
			data: {
				hero_bg: newHeroBg,
				about_us_brands: Number(data.about_us_brands),
				about_us_countries: Number(data.about_us_countries),
				about_us_products: Number(data.about_us_products),
				about_us_years_exp: Number(data.about_us_years_exp),
				contact_email: data.contact_email,
				contact_phone: data.contact_phone,
				homePageEn: {
					update: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						about_us_title: data.about_us_title_en,
						about_us_desc: data.about_us_desc_en,
						services_title: data.services_title_en,
						services_desc: data.services_desc_en,
						news_title: data.news_title_en,
						news_desc: data.news_desc_en,
						contact_title: data.contact_title_en,
						contact_desc: data.contact_desc_en,
						contact_address: data.contact_address,
						partners_title: data.partners_title_en,
						partners_desc: data.partners_desc_en,
					},
				},
				homePageId: {
					update: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						about_us_title: data.about_us_title,
						about_us_desc: data.about_us_desc,
						services_title: data.services_title,
						services_desc: data.services_desc,
						news_title: data.news_title,
						news_desc: data.news_desc,
						contact_title: data.contact_title,
						contact_desc: data.contact_desc,
						contact_address: data.contact_address,
						partners_title: data.partners_title,
						partners_desc: data.partners_desc,
					},
				},
			},
		});
	}
}
