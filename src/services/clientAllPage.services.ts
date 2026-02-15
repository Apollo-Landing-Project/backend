import { title } from "node:process";
import { db } from "../lib/prisma";

export class ClientAllService {
	static async getMetadata(lang: string, destination: string) {
		const metadata = await db.metadata.findUnique({
			where: {
				destination,
			},
		});
		if (!metadata) throw new Error("Metadata not found");
		const metadatafilter = {
			title: lang === "en" ? metadata.title_en : metadata.title_id,
			description:
				lang === "en" ? metadata.description_en : metadata.description_id,
		};
		return metadatafilter;
	}
	static async getHomePage(lang: string) {
		const home = await db.homePage.findFirst({
			where: {
				isActive: true,
			},
			include: {
				homePageEn: true,
				homePageId: true,
				heroSlides: true,
			},
		});

		if (!home) throw new Error("Home Page not found");

		const serviceItems = await db.service.findMany({
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
		const newsItems = await db.newsNews.findMany({
			where: {
				isPublished: true,
			},
			orderBy: {
				publishedAt: "desc",
			},
			include: {
				newsNewsEn: true,
				newsNewsId: true,
			},
			take: 5,
		});
		const partnersFunding = await db.partner.findMany({
			where: {
				category: "FUNDING",
			},
			orderBy: {
				createdAt: "asc",
			},
		});
		const partnersInsurance = await db.partner.findMany({
			where: {
				category: "INSURANCE",
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		const content = lang === "en" ? home.homePageEn : home.homePageId;
		const heroSlides =
			lang == "en" ?
				home.heroSlides.map((slide) => ({
					id: slide.id,
					title: slide.title_en,
					desc: slide.desc_en,
					background: slide.bg_image,
				}))
			:	home.heroSlides.map((slide) => ({
					id: slide.id,
					title: slide.title_id,
					desc: slide.desc_id,
					background: slide.bg_image,
				}));

		if (!content) throw new Error("Home Page Content not found");

		return {
			id: home.id,

			hero: heroSlides,

			about: {
				badge: content.about_us_badge,
				title: content.about_us_title,
				desc: content.about_us_desc,
				yearsExp: home.about_us_years_exp,
				products: home.about_us_products,
				countries: home.about_us_countries,
				brands: home.about_us_brands,
			},

			services: {
				badge: content.services_badge,
				title: content.services_title,
				desc: content.services_desc,
				serviceItems: serviceItems.map((item) => ({
					id: item.id,
					title: lang === "en" ? item.serviceEn?.title : item.serviceId?.title,
					desc: lang === "en" ? item.serviceEn?.desc : item.serviceId?.desc,
					image: item.bg_image,
				})),
			},

			news: {
				badge: content.news_badge,
				title: content.news_title,
				desc: content.news_desc,
				newsItems: newsItems.map((item) => ({
					id: item.id,
					title:
						lang === "en" ? item.newsNewsEn?.title : item.newsNewsId?.title,
					desc:
						lang === "en" ?
							item.newsNewsEn?.description
						:	item.newsNewsId?.description,
					publishedAt: item.publishedAt,
					image: item.image,
				})),
			},

			partners: {
				badge: content.partners_badge,
				title: content.partners_title,
				desc: content.partners_desc,
				partnersFunding: partnersFunding.map((item) => ({
					id: item.id,
					name: item.name,
					image: item.logo_image,
				})),
				partnersInsurance: partnersInsurance.map((item) => ({
					id: item.id,
					name: item.name,
					image: item.logo_image,
				})),
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

		const content =
			lang === "en" ? aboutUs.aboutUsPageEn : aboutUs.aboutUsPageId;

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
				badge: content.hero_badge,
				title: content.hero_title,
				desc: content.hero_desc,
				background: aboutUs.hero_bg,
			},

			vision: {
				badge: content.vision_badge,
				title: content.vision_title,
				desc: content.vision_desc,
				quote: content.vision_quote,
				list: content.vision_list,
				imageParent: aboutUs.vision_image_parent,
				imageChild: aboutUs.vision_image_child,
			},

			mission: {
				badge: content.mission_badge,
				title: content.mission_title,
				desc: content.mission_desc,
				quote: content.mission_quote,
				list: content.mission_list,
				imageParent: aboutUs.mission_image_parent,
				imageChild: aboutUs.mission_image_child,
			},

			history: {
				badge: content.history_badge,
				title: content.history_title,
				desc: content.history_desc,
				imageParent: aboutUs.history_image_parent,
				imageChild: aboutUs.history_image_child,
			},

			companyStructure: {
				badge: content.company_structure_badge,
				title: content.company_structure_title,
				desc: content.company_structure_desc,
				items: aboutUs.companyStructures.map((cs) => ({
					id: cs.id,
					name: cs.name,
					icon: cs.icon_image,
				})),
			},

			boc: {
				badge: content.boc_badge,
				title: content.boc_title,
				desc: content.boc_desc,
				members: bocMembers,
			},

			bod: {
				badge: content.bod_badge,
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

		const pageContent =
			lang === "en" ? servicePage.servicePageEn : servicePage.servicePageId;

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
				badge: svcContent?.badge,
				id: svc.id,
				image: svc.bg_image,
				order: svc.order,
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
				badge: pageContent.hero_badge,
				title: pageContent.hero_title,
				desc: pageContent.hero_desc,
				background: servicePage.hero_bg,
			},

			services: serviceItems,

			usedCarGallery: {
				badge: pageContent.used_car_gallery_badge,
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

		const pageContent =
			lang === "en" ? newsPage.newsPageEn : newsPage.newsPageId;
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
				badge: pageContent.hero_badge,
				title: pageContent.hero_title,
				desc: pageContent.hero_desc,
				background: newsPage.hero_bg,
			},

			newsSection: {
				badge: pageContent.news_badge,
				title: pageContent.news_title,
				desc: pageContent.news_desc,
			},

			csrSection: {
				badge: pageContent.csr_badge,
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

	static async getInvestorRelationPage(lang: string) {
		const investorRelationPage = await db.investorPage.findFirst({
			where: { isActive: true },
			include: {
				inverstorPageEn: true,
				inverstorPageId: true,
			},
		});

		if (!investorRelationPage)
			throw new Error("Investor Relation Page not found");

		const content =
			lang === "en" ?
				investorRelationPage.inverstorPageEn
			:	investorRelationPage.inverstorPageId;
		if (!content) throw new Error("Investor Relation Page Content not found");

		const reports = await db.report.findMany({
			where: {
				is_publish: true,
			},
			orderBy: {
				publish_at: "desc",
			},
			include: {
				reportCategory: true,
                news: {
                    select: {
                        id: true,
                    }
                }
			},
		});

		const shares = await db.shares.findMany()

		return {
			id: investorRelationPage.id,
			hero: {
				badge: content.hero_badge,
				title: content.hero_title,
				desc: content.hero_desc,
				background: investorRelationPage.hero_bg,
			},

			stakeholders: {
				badge: content.stakeholders_badge,
				title: content.stakeholders_title,
				desc: content.stakeholders_desc,
				shares: shares
			},

			report: {
				badge: content.report_badge,
				title: content.report_title,
				desc: content.report_desc,
				reportItems: reports.map((report) => ({
					id: report.id,
                    news_id: report.news[0]?.id,
					title: lang === "en" ? report.title_en : report.title_id,
					description:
						lang === "en" ? report.description_en : report.description_id,
					file_url: report.file_url,
					published_at: report.publish_at,
					category: report.reportCategory.name,
				})),
			},
		};
	}
}
