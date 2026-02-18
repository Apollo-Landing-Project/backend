import { Router } from "express";
import { TranslateController } from "../controllers/transalate.controllers.js";
import rateLimit from "express-rate-limit";

const translateRoutes = Router();

// --- BANDWIDTH & RATE LIMITER ---
// Membatasi IP agar tidak spam request translate.
// OpenL limit 1000 requests/hour (hard limit).
// Kita set strict: Max 10 request per menit per IP.
const translateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 menit
	max: 10, // Limit 10 request per IP per windowMs
	message: {
		message: "Too many translation requests, please try again later.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

translateRoutes.post(
	"/translate",
	translateLimiter,
	TranslateController.translateText,
);

export default translateRoutes;
