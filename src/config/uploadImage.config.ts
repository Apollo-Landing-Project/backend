import multer, { type FileFilterCallback, type StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import type { Request } from "express";

const BASE_DIR = "/apollo/storage/images";

// Format tanggal & waktu
function getTimestamp(): string {
	const now = new Date();
	const date = now.toISOString().slice(0, 10).replace(/-/g, "");
	const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
	return `${date}-${time}`;
}

// Sanitasi prefix
function sanitize(text = "file"): string {
	return text.toLowerCase().replace(/[^a-z0-9-_]/g, "");
}

// Pastikan folder ada
function ensureDir(dir: string): void {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

// Storage engine dengan type-safe callback
const storage: StorageEngine = multer.diskStorage({
	destination: function (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void,
	) {
		ensureDir(BASE_DIR);
		cb(null, BASE_DIR);
	},

	filename: function (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void,
	) {
		const ext = path.extname(file.originalname).toLowerCase();
		const prefix = sanitize((req.body?.prefix as string) || "image");
		const timestamp = getTimestamp();

		const filename = `${prefix}-${timestamp}${ext}`;
		cb(null, filename);
	},
});

// Filter file dengan typing
const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback,
) => {
	const allowed = ["image/jpeg", "image/png", "image/webp"];

	if (allowed.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only JPG, PNG, WEBP images allowed"));
	}
};

export const uploadImage = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 20 * 1024 * 1024, // 20MB
	},
});
