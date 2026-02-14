import { envConfig } from "../config/env.config";
import { db } from "../lib/prisma";
import fs from "fs";
import path from "path";
import type { InvestorPageCreateInput } from "../models/investorPage.models";

export class InvestorPageServices {
    static async create(
        data: InvestorPageCreateInput,
        file_image: Express.Multer.File,
    ) {
        const newInvestorPage = await db.investorPage.create({
            data: {
                hero_bg: `${envConfig.host_url}/storage/images/${file_image.filename}`,
                inverstorPageId: {
                    create: {
                        hero_title: data.hero_title,
                        hero_desc: data.hero_desc,
                        hero_badge: data.hero_badge ?? null,
                        stakeholders_title: data.stakeholders_title,
                        stakeholders_desc: data.stakeholders_desc,
                        stakeholders_badge: data.stakeholders_badge ?? null,
                        report_title: data.report_title,
                        report_desc: data.report_desc,
                        report_badge: data.report_badge ?? null,
                    },
                },
                inverstorPageEn: {
                    create: {
                        hero_title: data.hero_title_en,
                        hero_desc: data.hero_desc_en,
                        hero_badge: data.hero_badge_en ?? null,
                        stakeholders_title: data.stakeholders_title_en,
                        stakeholders_desc: data.stakeholders_desc_en,
                        stakeholders_badge: data.stakeholders_badge_en ?? null,
                        report_title: data.report_title_en,
                        report_desc: data.report_desc_en,
                        report_badge: data.report_badge_en ?? null,
                    },
                },
            },
        });
        return newInvestorPage;
    }

    static async getAll() {
        return await db.investorPage.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                inverstorPageEn:true,
                inverstorPageId: true,
            },
        });
    }

    static async getById(id: string) {
        const data = await db.investorPage.findUnique({
            where: { id },
            include: {
                inverstorPageId: true,
                inverstorPageEn: true,
            },
        });
        if (!data) throw new Error("Investor page not found");
        return data;
    }

    static async toggleActive(id: string) {
        return await db.$transaction(async (tx) => {
            await tx.investorPage.updateMany({ data: { isActive: false } });
            return await tx.investorPage.update({
                where: { id },
                data: { isActive: true },
            });
        });
    }

    static async delete(id: string) {
        const data = await db.investorPage.findUnique({ where: { id } });
        if (!data) throw new Error("Not found");

        // Hapus file fisik
        const filename = data.hero_bg?.split("/").pop();
        if (filename) {
            const filePath = path.join("/apollo/storage/images", filename);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        return await db.$transaction(async (tx) => {
            await tx.investorPageId.delete({ where: { investorPageId: id } });
            await tx.investorPageEn.delete({ where: { investorPageId: id } });
            await tx.investorPage.delete({ where: { id } });
        });
    }

    static async update(id: string, data: any, file: Express.Multer.File) {
        const existing = await db.investorPage.findUnique({ where: { id } });
        if (!existing) throw new Error("Not found");

        let newHeroBg: string | null = existing.hero_bg;

        if (data.image_status === "change") {
            const oldUrl = existing.hero_bg;
            if (oldUrl) {
                const oldFilename = oldUrl.split("/").pop();
                if (oldFilename) {
                    const oldPath = path.join("/apollo/storage/images", oldFilename);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
            }
            if (file) {
                newHeroBg = `${envConfig.host_url}/storage/images/${file.filename}`;
            }
        }

        return await db.investorPage.update({
            where: { id },
            data: {
                hero_bg: newHeroBg,
                inverstorPageId: {
                    update: {
                        hero_title: data.hero_title,
                        hero_desc: data.hero_desc,
                        hero_badge: data.hero_badge ?? null,
                        stakeholders_title: data.stakeholders_title,
                        stakeholders_desc: data.stakeholders_desc,
                        stakeholders_badge: data.stakeholders_badge ?? null,
                        report_title: data.report_title,
                        report_desc: data.report_desc,
                        report_badge: data.report_badge ?? null,
                    },
                },
                inverstorPageEn: {
                    update: {
                        hero_title: data.hero_title_en,
                        hero_desc: data.hero_desc_en,
                        hero_badge: data.hero_badge_en ?? null,
                        stakeholders_title: data.stakeholders_title_en,
                        stakeholders_desc: data.stakeholders_desc_en,
                        stakeholders_badge: data.stakeholders_badge_en ?? null,
                        report_title: data.report_title_en,
                        report_desc: data.report_desc_en,
                        report_badge: data.report_badge_en ?? null,
                    },
                },
            },
        });
    }
}
