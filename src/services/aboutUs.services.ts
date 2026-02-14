import fs from "fs";
import path from "path";
import "dotenv/config";
import type { AboutPageInput } from "../models/aboutUsPage.models";
import { db } from "../lib/prisma";

// Type Helper
type UploadedFiles = { [fieldname: string]: Express.Multer.File[] } | undefined;

export class AboutUsPageServices {
	private static getFileUrl(
		files: UploadedFiles,
		fieldName: string,
		isMandatory: boolean = false,
	): string | null {
		const fileArray = files?.[fieldName];
		if (fileArray && fileArray.length > 0) {
			return `${process.env.HOST_URL}/storage/images/${fileArray[0]?.filename}`;
		}

		if (isMandatory) {
			throw new Error(`Image for '${fieldName}' is required!`);
		}

		return null;
	}

	// Helper 2: Hapus File Fisik
	private static deleteFile(url: string | null) {
		if (!url) return;
		const filename = url.split("/").pop();
		if (filename) {
			const filePath = path.join(process.cwd(), "storage/images", filename);
			if (fs.existsSync(filePath))
				try {
					fs.unlinkSync(filePath);
				} catch {}
		}
	}

	// Helper 3: Update Logic (Hapus lama jika ada baru)
	private static handleImageUpdate(
		currentUrl: string | null | undefined,
		files: UploadedFiles,
		fieldName: string,
		isMandatoryForUpdate: boolean = false, // Jika true, data di DB tidak boleh jadi null
	): string | null {
		const newUrl = this.getFileUrl(files, fieldName, false); // false disini, kita cek manual

		if (newUrl) {
			if (currentUrl) this.deleteFile(currentUrl); // Hapus file lama
			return newUrl;
		}

		// Jika tidak ada file baru, pakai file lama.
		// Jika file lama juga tidak ada DAN wajib, throw error (kasus corrupt data)
		if (isMandatoryForUpdate && !currentUrl) {
			// Opsional: Throw error atau biarkan (tergantung seberapa strict saat update)
			// throw new Error(`Image '${fieldName}' cannot be empty.`);
		}

		return currentUrl ?? null;
	}

	// --- CRUD METHODS ---

	static async getAll() {
		return await db.aboutUsPage.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				aboutUsPageId: true,
				aboutUsPageEn: true,
				governances: true,
				companyStructures: true,
			},
		});
	}

	static async getById(id: string) {
		const data = await db.aboutUsPage.findUnique({
			where: { id },
			include: {
				aboutUsPageId: true,
				aboutUsPageEn: true,
				governances: true,
				companyStructures: true,
			},
		});
		if (!data) throw new Error("Not found");
		return data;
	}

	// --- CREATE ---
	static async create(data: AboutPageInput, files: UploadedFiles) {
		// 1. Validasi Gambar Global (Wajib semua saat Create)
		const hero_bg = this.getFileUrl(files, "hero_bg", true);
		const vision_p = this.getFileUrl(files, "vision_image_parent", true);
		const vision_c = this.getFileUrl(files, "vision_image_child", true);
		const mission_p = this.getFileUrl(files, "mission_image_parent", true);
		const mission_c = this.getFileUrl(files, "mission_image_child", true);
		const history_p = this.getFileUrl(files, "history_image_parent", true);
		const history_c = this.getFileUrl(files, "history_image_child", true);

		// 2. Create Parent & Child Content
		const newPage = await db.aboutUsPage.create({
			data: {
				hero_bg,
				vision_image_parent: vision_p,
				vision_image_child: vision_c,
				mission_image_parent: mission_p,
				mission_image_child: mission_c,
				history_image_parent: history_p,
				history_image_child: history_c,

				aboutUsPageId: {
					create: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						hero_badge: data.hero_badge ?? null,
						vision_title: data.vision_title,
						vision_desc: data.vision_desc,
						vision_badge: data.vision_badge ?? null,
						vision_quote: data.vision_quote,
						vision_list: data.vision_list,
						mission_title: data.mission_title,
						mission_desc: data.mission_desc,
						mission_badge: data.mission_badge ?? null,
						mission_quote: data.mission_quote,
						mission_list: data.mission_list,
						history_title: data.history_title,
						history_desc: data.history_desc,
						history_badge: data.history_badge ?? null,
						company_structure_title: data.company_structure_title,
						company_structure_desc: data.company_structure_desc,
						company_structure_badge: data.company_structure_badge ?? null,
						boc_title: data.boc_title,
						boc_desc: data.boc_desc,
						boc_badge: data.boc_badge ?? null,
						bod_title: data.bod_title,
						bod_desc: data.bod_desc,
						bod_badge: data.bod_badge ?? null,
					},
				},
				aboutUsPageEn: {
					create: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						hero_badge: data.hero_badge_en ?? null,
						vision_title: data.vision_title_en,
						vision_desc: data.vision_desc_en,
						vision_badge: data.vision_badge_en ?? null,
						vision_quote: data.vision_quote_en,
						vision_list: data.vision_list_en,
						mission_title: data.mission_title_en,
						mission_desc: data.mission_desc_en,
						mission_badge: data.mission_badge_en ?? null,
						mission_quote: data.mission_quote_en,
						mission_list: data.mission_list_en,
						history_title: data.history_title_en,
						history_desc: data.history_desc_en,
						history_badge: data.history_badge_en ?? null,
						company_structure_title: data.company_structure_title_en,
						company_structure_desc: data.company_structure_desc_en,
						company_structure_badge: data.company_structure_badge_en ?? null,
						boc_title: data.boc_title_en,
						boc_desc: data.boc_desc_en,
						boc_badge: data.boc_badge_en ?? null,
						bod_title: data.bod_title_en,
						bod_desc: data.bod_desc_en,
						bod_badge: data.bod_badge_en ?? null,
					},
				},
			},
		});

		// 3. Create List: Governance (Wajib Foto)
		const governancePhotos = files?.["governance_photos"] || [];
		for (const item of data.governance_list) {
			let photoUrl: string | null = null;

			// Ambil file berdasarkan index yang dikirim frontend
			if (
				item.photo_index !== undefined &&
				governancePhotos[item.photo_index]
			) {
				photoUrl = `${process.env.HOST_URL}/storage/images/${governancePhotos[item.photo_index]?.filename}`;
			}

			// Validasi Wajib
			if (!photoUrl) {
				// Rollback (Delete page yg baru dibuat biar ga nyampah)
				await this.delete(newPage.id);
				throw new Error(`Photo is required for Governance item: ${item.name}`);
			}

			await db.governance.create({
				data: {
					aboutUsPageId: newPage.id,
					name: item.name,
					position: item.position,
					position_desc: item.position_desc,
					photo_image: photoUrl,
				},
			});
		}

		// 4. Create List: Company Structure (Wajib Icon)
		const structureIcons = files?.["company_structure_icons"] || [];
		for (const item of data.company_structure_list) {
			let iconUrl: string | null = null;
			if (item.icon_index !== undefined && structureIcons[item.icon_index]) {
				iconUrl = `${process.env.HOST_URL}/storage/images/${structureIcons[item.icon_index]?.filename}`;
			}

			if (!iconUrl) {
				await this.delete(newPage.id);
				throw new Error(`Icon is required for Structure item: ${item.name}`);
			}

			await db.companyStructure.create({
				data: {
					aboutUsPageId: newPage.id,
					name: item.name,
					icon_image: iconUrl,
				},
			});
		}

		return newPage;
	}

	// --- UPDATE ---
	static async update(id: string, data: AboutPageInput, files: UploadedFiles) {
		const existing = await db.aboutUsPage.findUnique({ where: { id } });
		if (!existing) throw new Error("Not found");

		// 1. Update Global Images (Keep old if no new upload)
		const hero_bg = this.handleImageUpdate(
			existing.hero_bg,
			files,
			"hero_bg",
			true,
		);
		const vision_p = this.handleImageUpdate(
			existing.vision_image_parent,
			files,
			"vision_image_parent",
			true,
		);
		const vision_c = this.handleImageUpdate(
			existing.vision_image_child,
			files,
			"vision_image_child",
			true,
		);
		const mission_p = this.handleImageUpdate(
			existing.mission_image_parent,
			files,
			"mission_image_parent",
			true,
		);
		const mission_c = this.handleImageUpdate(
			existing.mission_image_child,
			files,
			"mission_image_child",
			true,
		);
		const history_p = this.handleImageUpdate(
			existing.history_image_parent,
			files,
			"history_image_parent",
			true,
		);
		const history_c = this.handleImageUpdate(
			existing.history_image_child,
			files,
			"history_image_child",
			true,
		);

		await db.aboutUsPage.update({
			where: { id },
			data: {
				hero_bg,
				vision_image_parent: vision_p,
				vision_image_child: vision_c,
				mission_image_parent: mission_p,
				mission_image_child: mission_c,
				history_image_parent: history_p,
				history_image_child: history_c,

				aboutUsPageId: {
					update: {
						hero_title: data.hero_title,
						hero_desc: data.hero_desc,
						hero_badge: data.hero_badge ?? null,
						vision_title: data.vision_title,
						vision_desc: data.vision_desc,
						vision_badge: data.vision_badge ?? null,
						vision_quote: data.vision_quote,
						vision_list: data.vision_list,
						mission_title: data.mission_title,
						mission_desc: data.mission_desc,
						mission_badge: data.mission_badge ?? null,
						mission_quote: data.mission_quote,
						mission_list: data.mission_list,
						history_title: data.history_title,
						history_desc: data.history_desc,
						history_badge: data.history_badge ?? null,
						company_structure_title: data.company_structure_title,
						company_structure_desc: data.company_structure_desc,
						company_structure_badge: data.company_structure_badge ?? null,
						boc_title: data.boc_title,
						boc_desc: data.boc_desc,
						boc_badge: data.boc_badge ?? null,
						bod_title: data.bod_title,
						bod_desc: data.bod_desc,
						bod_badge: data.bod_badge ?? null,
					},
				},
				aboutUsPageEn: {
					update: {
						hero_title: data.hero_title_en,
						hero_desc: data.hero_desc_en,
						hero_badge: data.hero_badge_en ?? null,
						vision_title: data.vision_title_en,
						vision_desc: data.vision_desc_en,
						vision_badge: data.vision_badge_en ?? null,
						vision_quote: data.vision_quote_en,
						vision_list: data.vision_list_en,
						mission_title: data.mission_title_en,
						mission_desc: data.mission_desc_en,
						mission_badge: data.mission_badge_en ?? null,
						mission_quote: data.mission_quote_en,
						mission_list: data.mission_list_en,
						history_title: data.history_title_en,
						history_desc: data.history_desc_en,
						history_badge: data.history_badge_en ?? null,
						company_structure_title: data.company_structure_title_en,
						company_structure_desc: data.company_structure_desc_en,
						company_structure_badge: data.company_structure_badge_en ?? null,
						boc_title: data.boc_title_en,
						boc_desc: data.boc_desc_en,
						boc_badge: data.boc_badge_en ?? null,
						bod_title: data.bod_title_en,
						bod_desc: data.bod_desc_en,
						bod_badge: data.bod_badge_en ?? null,
					},
				},
			},
		});

		// 2. Sync Governance
		const governanceList = data.governance_list || [];
		const governancePhotos = files?.["governance_photos"] || [];
		const govIdsToKeep = governanceList.filter((i) => i.id).map((i) => i.id!);

		// Hapus items yang dibuang
		const deletedGovs = await db.governance.findMany({
			where: { aboutUsPageId: id, id: { notIn: govIdsToKeep } },
		});
		deletedGovs.forEach((g) => this.deleteFile(g.photo_image));
		await db.governance.deleteMany({
			where: { aboutUsPageId: id, id: { notIn: govIdsToKeep } },
		});

		for (const item of governanceList) {
			let photoUrl: string | undefined = undefined;

			if (
				item.photo_index !== undefined &&
				governancePhotos[item.photo_index]
			) {
				photoUrl = `${process.env.HOST_URL}/storage/images/${governancePhotos[item.photo_index]?.filename}`;
			}

			if (item.id) {
				// Update: Kalau ada foto baru, ganti. Kalau gak ada, biarkan.
				// Hapus foto lama fisik jika ada foto baru
				if (photoUrl) {
					const oldItem = await db.governance.findUnique({
						where: { id: item.id },
					});
					this.deleteFile(oldItem?.photo_image || null);
				}

				await db.governance.update({
					where: { id: item.id },
					data: {
						name: item.name,
						position: item.position,
						position_desc: item.position_desc,
						...(photoUrl && { photo_image: photoUrl }),
					},
				});
			} else {
				// Create Baru di dalam Update: Wajib ada foto
				if (!photoUrl)
					throw new Error(
						`New Governance item '${item.name}' requires a photo.`,
					);

				await db.governance.create({
					data: {
						aboutUsPageId: id,
						name: item.name,
						position: item.position,
						position_desc: item.position_desc,
						photo_image: photoUrl,
					},
				});
			}
		}

		// 3. Sync Company Structure (Logic sama dengan Governance)
		const structureList = data.company_structure_list || [];
		const structureIcons = files?.["company_structure_icons"] || [];
		const structIdsToKeep = structureList.filter((i) => i.id).map((i) => i.id!);

		const deletedStructs = await db.companyStructure.findMany({
			where: { aboutUsPageId: id, id: { notIn: structIdsToKeep } },
		});
		deletedStructs.forEach((c) => this.deleteFile(c.icon_image));
		await db.companyStructure.deleteMany({
			where: { aboutUsPageId: id, id: { notIn: structIdsToKeep } },
		});

		for (const item of structureList) {
			let iconUrl: string | undefined = undefined;
			if (item.icon_index !== undefined && structureIcons[item.icon_index]) {
				iconUrl = `${process.env.HOST_URL}/storage/images/${structureIcons[item.icon_index]?.filename}`;
			}

			if (item.id) {
				if (iconUrl) {
					const oldItem = await db.companyStructure.findUnique({
						where: { id: item.id },
					});
					this.deleteFile(oldItem?.icon_image || null);
				}
				await db.companyStructure.update({
					where: { id: item.id },
					data: { name: item.name, ...(iconUrl && { icon_image: iconUrl }) },
				});
			} else {
				if (!iconUrl)
					throw new Error(
						`New Structure item '${item.name}' requires an icon.`,
					);
				await db.companyStructure.create({
					data: { aboutUsPageId: id, name: item.name, icon_image: iconUrl },
				});
			}
		}

		return await this.getById(id);
	}

	static async toggleActive(id: string) {
		return await db.$transaction(async (tx) => {
			await tx.aboutUsPage.updateMany({ data: { isActive: false } });
			return await tx.aboutUsPage.update({
				where: { id },
				data: { isActive: true },
			});
		});
	}

	static async delete(id: string) {
		const data = await db.aboutUsPage.findUnique({
			where: { id },
			include: { governances: true, companyStructures: true },
		});
		if (!data) throw new Error("Not found");

		// Hapus fisik semua gambar
		this.deleteFile(data.hero_bg);
		this.deleteFile(data.vision_image_parent);
		this.deleteFile(data.vision_image_child);
		this.deleteFile(data.mission_image_parent);
		this.deleteFile(data.mission_image_child);
		this.deleteFile(data.history_image_parent);
		this.deleteFile(data.history_image_child);

		data.governances.forEach((g) => this.deleteFile(g.photo_image));
		data.companyStructures.forEach((c) => this.deleteFile(c.icon_image));

		return await db.aboutUsPage.delete({ where: { id } });
	}
}
