import "dotenv/config";

export const envConfig = {
	host_url: process.env.HOST_URL || "http://localhost:5000/api",
	node_env: process.env.NODE_ENV!,
	port: process.env.PORT || 5000,
	db_url: process.env.DATABASE_URL!,
	cookie_domain: process.env.COOKIE_DOMAIN!,
	jwt_secret: process.env.JWT_SECRET!,
};
