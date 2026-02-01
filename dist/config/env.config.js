import "dotenv/config";
export const envConfig = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    db_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
};
//# sourceMappingURL=env.config.js.map