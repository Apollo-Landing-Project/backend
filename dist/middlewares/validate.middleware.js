import { customCatch } from "../utils/customCatch";
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (err) {
        customCatch(err, res);
    }
};
//# sourceMappingURL=validate.middleware.js.map