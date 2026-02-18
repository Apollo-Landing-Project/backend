import express from "express";
import cors from "cors";
import "dotenv/config";
import { authRoutes } from "./routes/auth.routes.js";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { xss } from "express-xss-sanitizer";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// logger
app.use(morgan("dev"));
// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
app.use(cookieParser());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
// gzip compression
app.use(compression());
// enable cors
const allowedOrigins = process.env.ALLOWED_HOSTS?.split(",") || [];
app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);

app.use("/api", router);

app.get("/health", (_req, res) => {
	res.json({ message: "API running" });
});

export default app;
