import { db } from "../lib/prisma";
import type {
    ReportCategoryCreateInput,
    ReportCategoryUpdateInput,
} from "../models/reportCategory.models";

export class ReportCategoryServices {
    static async create(data: ReportCategoryCreateInput) {
        return await db.reportCategory.create({
            data: {
                name: data.name,
                description: data.description ?? null,
            },
        });
    }

    static async getAll() {
        return await db.reportCategory.findMany({
            include: {
                _count: {
                    select: { reports: true },
                },
            },
        });
    }

    static async getById(id: string) {
        const data = await db.reportCategory.findUnique({
            where: { id },
        });
        if (!data) throw new Error("Category not found");
        return data;
    }

    static async update(id: string, data: ReportCategoryUpdateInput) {
        const existing = await db.reportCategory.findUnique({ where: { id } });
        if (!existing) throw new Error("Category not found");

        return await db.reportCategory.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description ?? null,
            } as any,
        });
    }

    static async delete(id: string) {
        const existing = await db.reportCategory.findUnique({ where: { id } });
        if (!existing) throw new Error("Category not found");

        return await db.reportCategory.delete({
            where: { id },
        });
    }
}
