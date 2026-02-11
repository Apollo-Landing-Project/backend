import { db } from "../lib/prisma";
import fs from "fs";
import path from "path";
import "dotenv/config";
import type { CarGalleryInput } from "../models/service.models";

// --- HELPERS ---
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

export class CarGalleryService {
	// --- GET ALL ---
	static async getAll() {
		return await db.carGallery.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				carGalleryId: true,
				carGalleryEn: true,
			},
		});
	}

	// --- GET BY ID ---
	static async getById(id: string) {
		const data = await db.carGallery.findUnique({
			where: { id },
			include: {
				carGalleryId: true,
				carGalleryEn: true,
			},
		});
		if (!data) throw new Error("Car not found");
		return data;
	}

	// --- CREATE ---
	static async create(data: CarGalleryInput, file?: Express.Multer.File) {
		const car_image = getFileUrl(file);
		if (!car_image) throw new Error("Car Image is required");

		return await db.carGallery.create({
			data: {
				car_image,
				carGalleryId: {
					create: {
						title: data.title,
						desc: data.desc,
					},
				},
				carGalleryEn: {
					create: {
						title: data.title_en,
						desc: data.desc_en,
					},
				},
			},
		});
	}

	// --- UPDATE ---
	static async update(
		id: string,
		data: CarGalleryInput,
		file?: Express.Multer.File,
	) {
		const existing = await this.getById(id); // Cek existensi

		let car_image = existing.car_image;

		// Jika ada upload file baru
		if (file) {
			deleteFile(existing.car_image); // Hapus file lama
			car_image = getFileUrl(file); // Set file baru
		}

		return await db.carGallery.update({
			where: { id },
			data: {
				car_image,
				carGalleryId: {
					update: {
						title: data.title,
						desc: data.desc,
					},
				},
				carGalleryEn: {
					update: {
						title: data.title_en,
						desc: data.desc_en,
					},
				},
			},
			include: { carGalleryId: true, carGalleryEn: true },
		});
	}

	// --- DELETE ---
	static async delete(id: string) {
		const existing = await this.getById(id);

		// Hapus File Fisik
		deleteFile(existing.car_image);

		// Hapus Database (Cascade delete anak-anaknya otomatis via Prisma relation)
		return await db.carGallery.delete({ where: { id } });
	}
}
