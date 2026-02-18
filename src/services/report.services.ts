import { envConfig } from "../config/env.config.js";
import { db } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import type {
	ReportCreateInput,
	ReportUpdateInput,
} from "../models/report.models.js";

export class ReportServices {
	static async create(
		data: ReportCreateInput,
		file: Express.Multer.File,
		newsImage?: Express.Multer.File,
		newsAuthorImage?: Express.Multer.File,
	) {
		let fileUrl = null;
		if (file) {
			fileUrl = `${envConfig.host_url}/storage/files/${file.filename}`;
		}

		let newsImageUrl = null;
		if (newsImage) {
			newsImageUrl = `${envConfig.host_url}/storage/files/${newsImage.filename}`;
		}

		let newsAuthorImageUrl = null;
		if (newsAuthorImage) {
			newsAuthorImageUrl = `${envConfig.host_url}/storage/files/${newsAuthorImage.filename}`;
		}

		const report = await db.report.create({
			data: {
				title_id: data.title_id ?? null,
				title_en: data.title_en ?? null,
				description_id: data.description_id ?? null,
				description_en: data.description_en ?? null,
				publish_at: data.publish_at,
				is_publish: data.is_publish ?? true,
				reportCategoryId: data.reportCategoryId,
				file_url: fileUrl,
				...(data.news_content_id || data.news_content_en || newsImageUrl || newsAuthorImageUrl ? {
					news: {
						create: {
							isPublished: data.is_publish ?? true,
							image: newsImageUrl,
							author: data.news_author ?? null,
							author_image: newsAuthorImageUrl,
							publishedAt: data.publish_at,
							newsNewsId: {
								create: {
									title: data.title_id ?? null,
									description: data.description_id ?? null,
									content: data.news_content_id ?? null,
								},
							},
							newsNewsEn: {
								create: {
									title: data.title_en ?? null,
									description: data.description_en ?? null,
									content: data.news_content_en ?? null,
								},
							},
						},
					},
				} : {}),
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
				news: {
					include: {
						newsNewsEn: true,
						newsNewsId: true
					}
				},
			},
		});
		if (!data) throw new Error("Report not found");
		return data;
	}

	static async update(
		id: string,
		data: ReportUpdateInput,
		file?: Express.Multer.File,
		newsImage?: Express.Multer.File,
		newsAuthorImage?: Express.Multer.File,
	) {
		const existing = await db.report.findUnique({
			where: { id },
			include: { news: true },
		});
		if (!existing) throw new Error("Report not found");

		let newFileUrl = existing.file_url;
		// Handle Report file changes
		if (data.file_status === "change") {
			if (existing.file_url) {
				const oldFilename = existing.file_url.split("/").pop();
				if (oldFilename) {
					const oldPath = path.join("/apollo/storage/files", oldFilename);
					if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
				}
			}
			if (file) {
				newFileUrl = `${envConfig.host_url}/storage/files/${file.filename}`;
			} else {
				newFileUrl = null;
			}
		}

		// Handle News Files
		let newsImageUrl = existing.news[0]?.image ?? null;
		if (newsImage) {
			// Delete old news image if exists
			if (existing.news[0]?.image) {
				const oldFilename = existing.news[0]?.image.split("/").pop();
				if (oldFilename) {
					const oldPath = path.join("/apollo/storage/files", oldFilename);
					if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
				}
			}
			newsImageUrl = `${envConfig.host_url}/storage/files/${newsImage.filename}`;
		}

		let newsAuthorImageUrl = existing.news[0]?.author_image ?? null;
		if (newsAuthorImage) {
			// Delete old author image if exists
			if (existing.news[0]?.author_image) {
				const oldFilename = existing.news[0].author_image.split("/").pop();
				if (oldFilename) {
					const oldPath = path.join("/apollo/storage/files", oldFilename);
					if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
				}
			}
			newsAuthorImageUrl = `${envConfig.host_url}/storage/files/${newsAuthorImage.filename}`;
		}

		const report = await db.report.update({
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

		// Upsert NewsNews ONLY if news content is provided or existing news needs update
		if (existing.news[0]) {
			// If news exists, update it
			await db.newsNews.update({
				where: { id: existing.news[0].id },
				data: {
					isPublished: data.is_publish ?? undefined,
					image: newsImageUrl,
					author: data.news_author ?? undefined,
					author_image: newsAuthorImageUrl,
					publishedAt: data.publish_at ?? undefined,
					newsNewsId: {
						update: {
							...(data.title_id !== undefined && { title: data.title_id }),
							...(data.description_id !== undefined && {
								description: data.description_id,
							}),
							...(data.news_content_id !== undefined && {
								content: data.news_content_id,
							}),
						},
					},
					newsNewsEn: {
						update: {
							...(data.title_en !== undefined && { title: data.title_en }),
							...(data.description_en !== undefined && {
								description: data.description_en,
							}),
							...(data.news_content_en !== undefined && {
								content: data.news_content_en,
							}),
						},
					},
				} as any,
			});
		} else if (data.news_content_id || data.news_content_en || newsImageUrl || newsAuthorImageUrl) {
			// Create if not exists AND content is provided
			await db.newsNews.create({
				data: {
					isPublished: data.is_publish ?? true,
					image: newsImageUrl,
					author: data.news_author ?? null,
					author_image: newsAuthorImageUrl,
					publishedAt: data.publish_at ?? report.publish_at,
					report_id: report.id,
					newsNewsId: {
						create: {
							title: data.title_id ?? report.title_id,
							description: data.description_id ?? report.description_id,
							content: data.news_content_id ?? null,
						},
					},
					newsNewsEn: {
						create: {
							title: data.title_en ?? report.title_en,
							description: data.description_en ?? report.description_en,
							content: data.news_content_en ?? null,
						},
					},
				},
			});
		}

		return report;
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
		return await db.$transaction(async (tx) => {
			const news = await tx.newsNews.findFirst({
				where: { report_id: id },
			});
			if (news) {
				await tx.newsNewsEn.delete({ where: { newsNewsId: news.id } });
				await tx.newsNewsId.delete({ where: { newsNewsId: news.id } });
				await tx.newsNews.delete({
					where: { id: news.id },
				});
			}
			await tx.report.delete({
				where: { id },
			});
		});
	}
}
