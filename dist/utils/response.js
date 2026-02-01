export const responseError = (res, code, message, error) => {
    res.status(code).json({
        status: "failed",
        message,
        error,
    });
};
export const responseSuccess = (res, code, message, data) => {
    res.status(code).json({
        status: "success",
        message,
        data,
    });
};
//# sourceMappingURL=response.js.map