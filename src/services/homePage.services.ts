import { envConfig } from "../config/env.config.js";
import { db } from "../lib/prisma.js";
import type { HomePageCreateInput } from "../models/homePage.models.js";
import fs from "fs";
import path from "path";

export class HomePageServices {
	static async create(
		data: HomePageCreateInput,
		file_image: Express.Multer.File[],
	) {
		const heroSlidesData = file_image.map((file, idx) => ({
			order: idx,
			bg_image: `${envConfig.host_url}/storage/images/${file.filename}`,
			title_id: (data as any)[`hero_title_${idx}`] || null,
			desc_id: (data as any)[`hero_desc_${idx}`] || null,
			title_en: (data as any)[`hero_title_en_${idx}`] || null,
			desc_en: (data as any)[`hero_desc_en_${idx}`] || null,
		}));

		const newHomePage = await db.homePage.create({
			data: {
				heroSlides: {
					create: heroSlidesData,
				},
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
						about_us_badge: data.about_us_badge_en,
						about_us_title: data.about_us_title_en,
						about_us_desc: data.about_us_desc_en,
						services_badge: data.services_badge_en,
						services_title: data.services_title_en,
						services_desc: data.services_desc_en,
						news_badge: data.news_badge_en,
						news_title: data.news_title_en,
						news_desc: data.news_desc_en,
						contact_title: data.contact_title_en,
						contact_desc: data.contact_desc_en,
						partners_badge: data.partners_badge_en,
						partners_title: data.partners_title_en,
						partners_desc: data.partners_desc_en,
					},
				},
				homePageId: {
					create: {
						about_us_badge: data.about_us_badge,
						about_us_title: data.about_us_title,
						about_us_desc: data.about_us_desc,
						services_badge: data.services_badge,
						services_title: data.services_title,
						services_desc: data.services_desc,
						news_badge: data.news_badge,
						news_title: data.news_title,
						news_desc: data.news_desc,
						contact_title: data.contact_title,
						contact_desc: data.contact_desc,
						partners_badge: data.partners_badge,
						partners_title: data.partners_title,
						partners_desc: data.partners_desc,
					},
				},
			},
		});
		return newHomePage;
	}

	// static async getAll() {
	// 	return await db.homePage.findMany({
	// 		orderBy: { createdAt: "desc" },
	// 		include: {
	// 			homePageId: true,
	// 			homePageEn: true,
	// 			heroSlides: { orderBy: { order: "asc" } },
	// 		},
	// 	});
	// }

	static async getAll() {
		return await db.homePage.findMany({
			orderBy: {createdAt: "desc"},
			include: {
				homePageId:true,
				homePageEn:true,
				heroSlides: true
			}
		})
	}

	static async getById(id: string) {
		const data = await db.homePage.findUnique({
			where: { id },
			include: {
				homePageId: true,
				homePageEn: true,
				heroSlides: { orderBy: { order: "asc" } },
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
		const data = await db.homePage.findUnique({
			where: { id },
			include: { heroSlides: true },
		});
		if (!data) throw new Error("Not found");

		// Delete physical hero slide images
		data.heroSlides.forEach((slide) => {
			if (slide.bg_image) {
				const filename = slide.bg_image.split("/").pop();
				if (filename) {
					const filePath = path.join("/apollo/storage/images", filename);
					if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
				}
			}
		});

		return await db.$transaction(async (tx) => {
			await tx.heroSlide.deleteMany({ where: { homePageId: id } });
			await tx.homePageId.delete({ where: { homePageId: id } });
			await tx.homePageEn.delete({ where: { homePageId: id } });
			await tx.homePage.delete({ where: { id } });
		});
	}

	static async update(id: string, data: any, files: Express.Multer.File[]) {
		const existing = await db.homePage.findUnique({
			where: { id },
			include: { heroSlides: { orderBy: { order: "asc" } } },
		});
		if (!existing) throw new Error("Not found");

		const imageStatus =
			Array.isArray(data.image_status)
				? data.image_status
				: JSON.parse(data.image_status || '["keep","keep","keep"]');

		let fileIndex = 0;

		// Update hero slides
		for (let i = 0; i < 3; i++) {
			const existingSlide = existing.heroSlides[i];
			let bgImage = existingSlide?.bg_image || null;

			if (imageStatus[i] === "change") {
				// Delete old image
				if (existingSlide?.bg_image) {
					const oldFilename = existingSlide.bg_image.split("/").pop();
					if (oldFilename) {
						const oldPath = path.join("/apollo/storage/images", oldFilename);
						if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
					}
				}

				const newFile = files[fileIndex];
				if (newFile) {
					bgImage = `${envConfig.host_url}/storage/images/${newFile.filename}`;
					fileIndex++;
				}
			}

			const slideData = {
				order: i,
				bg_image: bgImage,
				title_id: data[`hero_title_${i}`] ?? existingSlide?.title_id ?? null,
				desc_id: data[`hero_desc_${i}`] ?? existingSlide?.desc_id ?? null,
				title_en: data[`hero_title_en_${i}`] ?? existingSlide?.title_en ?? null,
				desc_en: data[`hero_desc_en_${i}`] ?? existingSlide?.desc_en ?? null,
			};

			if (existingSlide) {
				await db.heroSlide.update({
					where: { id: existingSlide.id },
					data: slideData,
				});
			} else {
				await db.heroSlide.create({
					data: {
						...slideData,
						homePageId: id,
					},
				});
			}
		}

		return await db.homePage.update({
			where: { id },
			data: {
				contact_address: data.contact_address,
				contact_link_map: data.contact_link_map,
				about_us_brands: Number(data.about_us_brands),
				about_us_countries: Number(data.about_us_countries),
				about_us_products: Number(data.about_us_products),
				about_us_years_exp: Number(data.about_us_years_exp),
				contact_email: data.contact_email,
				contact_phone: data.contact_phone,

				homePageEn: {
					update: {
						about_us_badge: data.about_us_badge_en,
						about_us_title: data.about_us_title_en,
						about_us_desc: data.about_us_desc_en,
						services_badge: data.services_badge_en,
						services_title: data.services_title_en,
						services_desc: data.services_desc_en,
						news_badge: data.news_badge_en,
						news_title: data.news_title_en,
						news_desc: data.news_desc_en,
						contact_title: data.contact_title_en,
						contact_desc: data.contact_desc_en,
						partners_badge: data.partners_badge_en,
						partners_title: data.partners_title_en,
						partners_desc: data.partners_desc_en,
					},
				},
				homePageId: {
					update: {
						about_us_badge: data.about_us_badge,
						about_us_title: data.about_us_title,
						about_us_desc: data.about_us_desc,
						services_badge: data.services_badge,
						services_title: data.services_title,
						services_desc: data.services_desc,
						news_badge: data.news_badge,
						news_title: data.news_title,
						news_desc: data.news_desc,
						contact_title: data.contact_title,
						contact_desc: data.contact_desc,
						partners_badge: data.partners_badge,
						partners_title: data.partners_title,
						partners_desc: data.partners_desc,
					},
				},
			},
			include: {
				heroSlides: { orderBy: { order: "asc" } },
				homePageId: true,
				homePageEn: true,
			},
		});
	}
}
