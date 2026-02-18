import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model HomePage
 *
 */
export type HomePage = Prisma.HomePageModel;
/**
 * Model HomePageId
 *
 */
export type HomePageId = Prisma.HomePageIdModel;
/**
 * Model HomePageEn
 *
 */
export type HomePageEn = Prisma.HomePageEnModel;
/**
 * Model HeroSlide
 *
 */
export type HeroSlide = Prisma.HeroSlideModel;
/**
 * Model AboutUsPage
 *
 */
export type AboutUsPage = Prisma.AboutUsPageModel;
/**
 * Model AboutUsPageId
 *
 */
export type AboutUsPageId = Prisma.AboutUsPageIdModel;
/**
 * Model AboutUsPageEn
 *
 */
export type AboutUsPageEn = Prisma.AboutUsPageEnModel;
/**
 * Model Governance
 *
 */
export type Governance = Prisma.GovernanceModel;
/**
 * Model CompanyStructure
 *
 */
export type CompanyStructure = Prisma.CompanyStructureModel;
/**
 * Model NewsPage
 *
 */
export type NewsPage = Prisma.NewsPageModel;
/**
 * Model NewsPageEn
 *
 */
export type NewsPageEn = Prisma.NewsPageEnModel;
/**
 * Model NewsPageId
 *
 */
export type NewsPageId = Prisma.NewsPageIdModel;
/**
 * Model ServicePage
 *
 */
export type ServicePage = Prisma.ServicePageModel;
/**
 * Model ServicePageId
 *
 */
export type ServicePageId = Prisma.ServicePageIdModel;
/**
 * Model ServicePageEn
 *
 */
export type ServicePageEn = Prisma.ServicePageEnModel;
/**
 * Model Service
 *
 */
export type Service = Prisma.ServiceModel;
/**
 * Model ServiceId
 *
 */
export type ServiceId = Prisma.ServiceIdModel;
/**
 * Model ServiceEn
 *
 */
export type ServiceEn = Prisma.ServiceEnModel;
/**
 * Model CarGallery
 *
 */
export type CarGallery = Prisma.CarGalleryModel;
/**
 * Model CarGalleryId
 *
 */
export type CarGalleryId = Prisma.CarGalleryIdModel;
/**
 * Model CarGalleryEn
 *
 */
export type CarGalleryEn = Prisma.CarGalleryEnModel;
/**
 * Model Partner
 *
 */
export type Partner = Prisma.PartnerModel;
/**
 * Model NewsNews
 *
 */
export type NewsNews = Prisma.NewsNewsModel;
/**
 * Model NewsNewsId
 *
 */
export type NewsNewsId = Prisma.NewsNewsIdModel;
/**
 * Model NewsNewsEn
 *
 */
export type NewsNewsEn = Prisma.NewsNewsEnModel;
/**
 * Model NewsCSR
 *
 */
export type NewsCSR = Prisma.NewsCSRModel;
/**
 * Model NewsCSRImage
 *
 */
export type NewsCSRImage = Prisma.NewsCSRImageModel;
/**
 * Model NewsCSRId
 *
 */
export type NewsCSRId = Prisma.NewsCSRIdModel;
/**
 * Model NewsCSREn
 *
 */
export type NewsCSREn = Prisma.NewsCSREnModel;
/**
 * Model InvestorPage
 *
 */
export type InvestorPage = Prisma.InvestorPageModel;
/**
 * Model InvestorPageId
 *
 */
export type InvestorPageId = Prisma.InvestorPageIdModel;
/**
 * Model InvestorPageEn
 *
 */
export type InvestorPageEn = Prisma.InvestorPageEnModel;
/**
 * Model Shares
 *
 */
export type Shares = Prisma.SharesModel;
/**
 * Model Report
 *
 */
export type Report = Prisma.ReportModel;
/**
 * Model ReportCategory
 *
 */
export type ReportCategory = Prisma.ReportCategoryModel;
/**
 * Model Metadata
 *
 */
export type Metadata = Prisma.MetadataModel;
//# sourceMappingURL=client.d.ts.map