import type { Response } from "express";

export const responseError = (
	res: Response,
	code: number,
	message: string,
	error?: any
) => {
	res.status(code).json({
		status: "failed",
		message,
		error,
	});
};

export const responseSuccess = (
	res: Response,
	code: number,
	message: string,
	data?: any
) => {
	res.status(code).json({
		status: "success",
		message,
		data,
	});
};

export const responseSuccessWithMetadata = (
	res: Response,
	code: number,
	message: string,
	data?: any,
	metadata?:any
) => {
	res.status(code).json({
		status: "success",
		message,
		data,
		metadata
	});

};
