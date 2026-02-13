import { db } from "../lib/prisma";

export class ClientAllService {
    static async getHomePage(lang: string) {
        const home = await db.homePage.findFirst({
            where: {
                isActive: true,
            },
            include: {
                homePageEn: true,
                homePageId: true,
            },
        });

        if (!home) throw new Error("Home Page not found");

        const content = lang === "en" ? home.homePageEn : home.homePageId;

        if (!content) throw new Error("Home Page Content not found");

        return {
            id: home.id,

            hero: {
                title: content.hero_title,
                desc: content.hero_desc,
                background: home.hero_bg,
            },

            about: {
                title: content.about_us_title,
                desc: content.about_us_desc,
                yearsExp: home.about_us_years_exp,
                products: home.about_us_products,
                countries: home.about_us_countries,
                brands: home.about_us_brands,
            },

            services: {
                title: content.services_title,
                desc: content.services_desc,
            },

            news: {
                title: content.news_title,
                desc: content.news_desc,
            },

            partners: {
                title: content.partners_title,
                desc: content.partners_desc,
            },

            contact: {
                title: content.contact_title,
                desc: content.contact_desc,
                email: home.contact_email,
                phone: home.contact_phone,
                address: home.contact_address,
                mapLink: home.contact_link_map,
            },
        };
    }

    static async getAboutUsPage(lang: string) {
        const aboutUs = await db.aboutUsPage.findFirst({
            where: {
                isActive: true,
            },
            include: {
                aboutUsPageEn: true,
                aboutUsPageId: true,
                governances: true,
                companyStructures: true,
            },
        });

        if (!aboutUs) throw new Error("About Us Page not found");

        const content = lang === "en" ? aboutUs.aboutUsPageEn : aboutUs.aboutUsPageId;

        if (!content) throw new Error("About Us Page Content not found");

        // Separate governance into BOC and BOD
        const bocMembers = aboutUs.governances
            .filter((g) => g.position === "BOC")
            .map((g) => ({
                id: g.id,
                name: g.name,
                positionDesc: g.position_desc,
                photo: g.photo_image,
            }));

        const bodMembers = aboutUs.governances
            .filter((g) => g.position === "BOD")
            .map((g) => ({
                id: g.id,
                name: g.name,
                positionDesc: g.position_desc,
                photo: g.photo_image,
            }));

        return {
            id: aboutUs.id,

            hero: {
                title: content.hero_title,
                desc: content.hero_desc,
                background: aboutUs.hero_bg,
            },

            vision: {
                title: content.vision_title,
                desc: content.vision_desc,
                quote: content.vision_quote,
                list: content.vision_list,
                imageParent: aboutUs.vision_image_parent,
                imageChild: aboutUs.vision_image_child,
            },

            mission: {
                title: content.mission_title,
                desc: content.mission_desc,
                quote: content.mission_quote,
                list: content.mission_list,
                imageParent: aboutUs.mission_image_parent,
                imageChild: aboutUs.mission_image_child,
            },

            history: {
                title: content.history_title,
                desc: content.history_desc,
                imageParent: aboutUs.history_image_parent,
                imageChild: aboutUs.history_image_child,
            },

            companyStructure: {
                title: content.company_structure_title,
                desc: content.company_structure_desc,
                items: aboutUs.companyStructures.map((cs) => ({
                    id: cs.id,
                    name: cs.name,
                    icon: cs.icon_image,
                })),
            },

            boc: {
                title: content.boc_title,
                desc: content.boc_desc,
                members: bocMembers,
            },

            bod: {
                title: content.bod_title,
                desc: content.bod_desc,
                members: bodMembers,
            },
        };
    }

    static async getServicePage(lang: string) {
        // 1. Get active ServicePage with lang content
        const servicePage = await db.servicePage.findFirst({
            where: {
                isActive: true,
            },
            include: {
                servicePageEn: true,
                servicePageId: true,
            },
        });

        if (!servicePage) throw new Error("Service Page not found");

        const pageContent = lang === "en" ? servicePage.servicePageEn : servicePage.servicePageId;

        if (!pageContent) throw new Error("Service Page Content not found");

        // 2. Get all active services ordered by order
        const services = await db.service.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: "asc",
            },
            include: {
                serviceEn: true,
                serviceId: true,
            },
        });

        const serviceItems = services.map((svc) => {
            const svcContent = lang === "en" ? svc.serviceEn : svc.serviceId;
            return {
                id: svc.id,
                image: svc.bg_image,
                title: svcContent?.title,
                desc: svcContent?.desc,
                location: svcContent?.location,
                contact: svcContent?.contact,
                email: svcContent?.email,
                quote: svcContent?.quote,
            };
        });

        // 3. Get all car gallery items
        const carGalleries = await db.carGallery.findMany({
            include: {
                carGalleryEn: true,
                carGalleryId: true,
            },
        });

        const galleryItems = carGalleries.map((car) => {
            const carContent = lang === "en" ? car.carGalleryEn : car.carGalleryId;
            return {
                id: car.id,
                image: car.car_image,
                title: carContent?.title,
                desc: carContent?.desc,
            };
        });

        return {
            id: servicePage.id,

            hero: {
                title: pageContent.hero_title,
                desc: pageContent.hero_desc,
                background: servicePage.hero_bg,
            },

            services: serviceItems,

            usedCarGallery: {
                title: pageContent.used_car_gallery_title,
                desc: pageContent.used_car_gallery_desc,
                items: galleryItems,
            },
        };
    }

    static async getNewsPage(lang: string) {
        // 1. Get active NewsPage with lang content
        const newsPage = await db.newsPage.findFirst({
            where: { isActive: true },
            include: {
                newsPageEn: true,
                newsPageId: true,
            },
        });

        if (!newsPage) throw new Error("News Page not found");

        const pageContent = lang === "en" ? newsPage.newsPageEn : newsPage.newsPageId;
        if (!pageContent) throw new Error("News Page Content not found");

        // 2. Get published NewsNews
        const newsNewsList = await db.newsNews.findMany({
            where: { isPublished: true },
            orderBy: { publishedAt: "desc" },
            include: {
                newsNewsEn: true,
                newsNewsId: true,
            },
        });

        const newsItems = newsNewsList.map((item) => {
            const content = lang === "en" ? item.newsNewsEn : item.newsNewsId;
            return {
                id: item.id,
                title: content?.title,
                description: content?.description,
                image: item.image,
                author: item.author,
                authorImage: item.author_image,
                publishedAt: item.publishedAt,
            };
        });

        // 3. Get published NewsCSR
        const csrList = await db.newsCSR.findMany({
            where: { isPublished: true },
            orderBy: { publishedAt: "desc" },
            include: {
                newsCSREn: true,
                newsCSRId: true,
                newsCSRImage: true,
            },
        });

        const csrItems = csrList.map((item) => {
            const content = lang === "en" ? item.newsCSREn : item.newsCSRId;
            return {
                id: item.id,
                title: content?.title,
                description: content?.description,
                author: item.author,
                authorImage: item.author_image,
                publishedAt: item.publishedAt,
                images: item.newsCSRImage.map((img) => ({
                    id: img.id,
                    image: img.image,
                    description: lang === "en" ? img.description_en : img.description_id,
                })),
            };
        });

        return {
            id: newsPage.id,

            hero: {
                title: pageContent.hero_title,
                desc: pageContent.hero_desc,
                background: newsPage.hero_bg,
            },

            newsSection: {
                title: pageContent.news_title,
                desc: pageContent.news_desc,
            },

            csrSection: {
                title: pageContent.csr_title,
                desc: pageContent.csr_desc,
            },

            news: newsItems,
            csr: csrItems,
        };
    }

    static async getNewsDetail(id: string, lang: string) {
        const news = await db.newsNews.findUnique({
            where: { id },
            include: {
                newsNewsEn: true,
                newsNewsId: true,
            },
        });

        if (!news) throw new Error("News not found");

        const content = lang === "en" ? news.newsNewsEn : news.newsNewsId;
        if (!content) throw new Error("News Content not found");

        return {
            id: news.id,
            title: content.title,
            description: content.description,
            content: content.content,
            image: news.image,
            author: news.author,
            authorImage: news.author_image,
            publishedAt: news.publishedAt,
        };
    }

    static async getNewsCSRDetail(id: string, lang: string) {
        const news = await db.newsCSR.findUnique({
            where: { id },
            include: {
                newsCSREn: true,
                newsCSRId: true,
                newsCSRImage: true,
            },
        });

        if (!news) throw new Error("News CSR not found");

        const content = lang === "en" ? news.newsCSREn : news.newsCSRId;
        if (!content) throw new Error("News CSR Content not found");

        return {
            id: news.id,
            title: content.title,
            description: content.description,
            content: content.content,
            image: news.newsCSRImage.map((img) => ({
                image: img.image,
                description: lang === "en" ? img.description_en : img.description_id,
            })),
            author: news.author,
            authorImage: news.author_image,
            publishedAt: news.publishedAt,
        };
    }
}