-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'GUEST');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('BOD', 'BOC');

-- CreateEnum
CREATE TYPE "PartnerCategory" AS ENUM ('INSURANCE', 'FUNDING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'SUPER_ADMIN',
    "profile_image" TEXT NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbm6QhXf5jqRZcX6R-lNF9sgaYnR0jtHKh0A&s',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePage" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "about_us_years_exp" INTEGER,
    "about_us_products" INTEGER,
    "about_us_countries" INTEGER,
    "about_us_brands" INTEGER,
    "contact_email" TEXT[],
    "contact_phone" TEXT[],
    "contact_link_map" TEXT,
    "contact_address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePageId" (
    "id" TEXT NOT NULL,
    "about_us_badge" TEXT,
    "about_us_title" TEXT,
    "about_us_desc" TEXT,
    "services_badge" TEXT,
    "services_title" TEXT,
    "services_desc" TEXT,
    "news_badge" TEXT,
    "news_title" TEXT,
    "news_desc" TEXT,
    "partners_badge" TEXT,
    "partners_title" TEXT,
    "partners_desc" TEXT,
    "contact_title" TEXT,
    "contact_desc" TEXT,
    "homePageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePageId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePageEn" (
    "id" TEXT NOT NULL,
    "about_us_badge" TEXT,
    "about_us_title" TEXT,
    "about_us_desc" TEXT,
    "services_badge" TEXT,
    "services_title" TEXT,
    "services_desc" TEXT,
    "news_badge" TEXT,
    "news_title" TEXT,
    "news_desc" TEXT,
    "partners_badge" TEXT,
    "partners_title" TEXT,
    "partners_desc" TEXT,
    "contact_title" TEXT,
    "contact_desc" TEXT,
    "homePageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePageEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "bg_image" TEXT,
    "title_id" TEXT,
    "desc_id" TEXT,
    "title_en" TEXT,
    "desc_en" TEXT,
    "homePageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutUsPage" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "hero_bg" TEXT,
    "vision_image_parent" TEXT,
    "vision_image_child" TEXT,
    "mission_image_parent" TEXT,
    "mission_image_child" TEXT,
    "history_image_parent" TEXT,
    "history_image_child" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutUsPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutUsPageId" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT,
    "vision_badge" TEXT,
    "vision_title" TEXT,
    "vision_desc" TEXT,
    "vision_quote" TEXT,
    "vision_list" TEXT[],
    "mission_badge" TEXT,
    "mission_title" TEXT,
    "mission_desc" TEXT,
    "mission_quote" TEXT,
    "mission_list" TEXT[],
    "history_badge" TEXT,
    "history_title" TEXT,
    "history_desc" TEXT,
    "company_structure_badge" TEXT,
    "company_structure_title" TEXT,
    "company_structure_desc" TEXT,
    "boc_badge" TEXT,
    "boc_title" TEXT,
    "boc_desc" TEXT,
    "bod_badge" TEXT,
    "bod_title" TEXT,
    "bod_desc" TEXT,
    "aboutUsPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutUsPageId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutUsPageEn" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT,
    "vision_badge" TEXT,
    "vision_title" TEXT,
    "vision_desc" TEXT,
    "vision_quote" TEXT,
    "vision_list" TEXT[],
    "mission_badge" TEXT,
    "mission_title" TEXT,
    "mission_desc" TEXT,
    "mission_quote" TEXT,
    "mission_list" TEXT[],
    "history_badge" TEXT,
    "history_title" TEXT,
    "history_desc" TEXT,
    "company_structure_badge" TEXT,
    "company_structure_title" TEXT,
    "company_structure_desc" TEXT,
    "boc_badge" TEXT,
    "boc_title" TEXT,
    "boc_desc" TEXT,
    "bod_badge" TEXT,
    "bod_title" TEXT,
    "bod_desc" TEXT,
    "aboutUsPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutUsPageEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Governance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "position_desc" TEXT NOT NULL,
    "photo_image" TEXT,
    "aboutUsPageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Governance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyStructure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon_image" TEXT,
    "aboutUsPageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsPage" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "hero_bg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsPageEn" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT,
    "news_badge" TEXT,
    "news_title" TEXT,
    "news_desc" TEXT,
    "csr_badge" TEXT,
    "csr_title" TEXT,
    "csr_desc" TEXT,
    "newsPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsPageEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsPageId" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT,
    "news_badge" TEXT,
    "news_title" TEXT,
    "news_desc" TEXT,
    "csr_badge" TEXT,
    "csr_title" TEXT,
    "csr_desc" TEXT,
    "newsPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsPageId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePage" (
    "id" TEXT NOT NULL,
    "hero_bg" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePageId" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT,
    "used_car_gallery_badge" TEXT,
    "used_car_gallery_title" TEXT,
    "used_car_gallery_desc" TEXT,
    "servicePageId" TEXT NOT NULL,

    CONSTRAINT "ServicePageId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePageEn" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT,
    "used_car_gallery_badge" TEXT,
    "used_car_gallery_title" TEXT,
    "used_car_gallery_desc" TEXT,
    "servicePageId" TEXT NOT NULL,

    CONSTRAINT "ServicePageEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "bg_image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceId" (
    "id" TEXT NOT NULL,
    "badge" TEXT,
    "title" TEXT,
    "desc" TEXT,
    "location" TEXT,
    "contact" TEXT[],
    "email" TEXT[],
    "quote" TEXT,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceEn" (
    "id" TEXT NOT NULL,
    "badge" TEXT,
    "title" TEXT,
    "desc" TEXT,
    "location" TEXT,
    "contact" TEXT[],
    "email" TEXT[],
    "quote" TEXT,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarGallery" (
    "id" TEXT NOT NULL,
    "car_image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarGalleryId" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "desc" TEXT,
    "carGalleryId" TEXT NOT NULL,

    CONSTRAINT "CarGalleryId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarGalleryEn" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "desc" TEXT,
    "carGalleryId" TEXT NOT NULL,

    CONSTRAINT "CarGalleryEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "logo_image" TEXT,
    "category" "PartnerCategory" NOT NULL DEFAULT 'INSURANCE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsNews" (
    "id" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "author" TEXT,
    "author_image" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsNewsId" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "newsNewsId" TEXT NOT NULL,

    CONSTRAINT "NewsNewsId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsNewsEn" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "newsNewsId" TEXT NOT NULL,

    CONSTRAINT "NewsNewsEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCSR" (
    "id" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "author" TEXT,
    "author_image" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsCSR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCSRImage" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description_en" TEXT,
    "description_id" TEXT,
    "newsCSRId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsCSRImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCSRId" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "newsCSRId" TEXT NOT NULL,

    CONSTRAINT "NewsCSRId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCSREn" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "newsCSRId" TEXT NOT NULL,

    CONSTRAINT "NewsCSREn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorPage" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "hero_bg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorPageId" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT NOT NULL,
    "stakeholders_badge" TEXT,
    "stakeholders_title" TEXT,
    "stakeholders_desc" TEXT,
    "report_badge" TEXT,
    "report_title" TEXT,
    "report_desc" TEXT,
    "investorPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorPageId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorPageEn" (
    "id" TEXT NOT NULL,
    "hero_badge" TEXT,
    "hero_title" TEXT,
    "hero_desc" TEXT NOT NULL,
    "stakeholders_badge" TEXT,
    "stakeholders_title" TEXT,
    "stakeholders_desc" TEXT,
    "report_badge" TEXT,
    "report_title" TEXT,
    "report_desc" TEXT,
    "investorPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorPageEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shares" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "title_id" TEXT,
    "title_en" TEXT,
    "description_id" TEXT,
    "description_en" TEXT,
    "file_url" TEXT,
    "publish_at" TIMESTAMP(3) NOT NULL,
    "is_publish" BOOLEAN NOT NULL DEFAULT true,
    "reportCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ReportCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "title_id" TEXT,
    "title_en" TEXT,
    "description_id" TEXT,
    "description_en" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HomePageId_homePageId_key" ON "HomePageId"("homePageId");

-- CreateIndex
CREATE UNIQUE INDEX "HomePageEn_homePageId_key" ON "HomePageEn"("homePageId");

-- CreateIndex
CREATE UNIQUE INDEX "AboutUsPageId_aboutUsPageId_key" ON "AboutUsPageId"("aboutUsPageId");

-- CreateIndex
CREATE UNIQUE INDEX "AboutUsPageEn_aboutUsPageId_key" ON "AboutUsPageEn"("aboutUsPageId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsPageEn_newsPageId_key" ON "NewsPageEn"("newsPageId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsPageId_newsPageId_key" ON "NewsPageId"("newsPageId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicePageId_servicePageId_key" ON "ServicePageId"("servicePageId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicePageEn_servicePageId_key" ON "ServicePageEn"("servicePageId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceId_serviceId_key" ON "ServiceId"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceEn_serviceId_key" ON "ServiceEn"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "CarGalleryId_carGalleryId_key" ON "CarGalleryId"("carGalleryId");

-- CreateIndex
CREATE UNIQUE INDEX "CarGalleryEn_carGalleryId_key" ON "CarGalleryEn"("carGalleryId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsNewsId_newsNewsId_key" ON "NewsNewsId"("newsNewsId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsNewsEn_newsNewsId_key" ON "NewsNewsEn"("newsNewsId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsCSRId_newsCSRId_key" ON "NewsCSRId"("newsCSRId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsCSREn_newsCSRId_key" ON "NewsCSREn"("newsCSRId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorPageId_investorPageId_key" ON "InvestorPageId"("investorPageId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorPageEn_investorPageId_key" ON "InvestorPageEn"("investorPageId");

-- CreateIndex
CREATE UNIQUE INDEX "Shares_category_key" ON "Shares"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ReportCategory_name_key" ON "ReportCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_destination_key" ON "Metadata"("destination");

-- AddForeignKey
ALTER TABLE "HomePageId" ADD CONSTRAINT "HomePageId_homePageId_fkey" FOREIGN KEY ("homePageId") REFERENCES "HomePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomePageEn" ADD CONSTRAINT "HomePageEn_homePageId_fkey" FOREIGN KEY ("homePageId") REFERENCES "HomePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroSlide" ADD CONSTRAINT "HeroSlide_homePageId_fkey" FOREIGN KEY ("homePageId") REFERENCES "HomePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutUsPageId" ADD CONSTRAINT "AboutUsPageId_aboutUsPageId_fkey" FOREIGN KEY ("aboutUsPageId") REFERENCES "AboutUsPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutUsPageEn" ADD CONSTRAINT "AboutUsPageEn_aboutUsPageId_fkey" FOREIGN KEY ("aboutUsPageId") REFERENCES "AboutUsPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Governance" ADD CONSTRAINT "Governance_aboutUsPageId_fkey" FOREIGN KEY ("aboutUsPageId") REFERENCES "AboutUsPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyStructure" ADD CONSTRAINT "CompanyStructure_aboutUsPageId_fkey" FOREIGN KEY ("aboutUsPageId") REFERENCES "AboutUsPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsPageEn" ADD CONSTRAINT "NewsPageEn_newsPageId_fkey" FOREIGN KEY ("newsPageId") REFERENCES "NewsPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsPageId" ADD CONSTRAINT "NewsPageId_newsPageId_fkey" FOREIGN KEY ("newsPageId") REFERENCES "NewsPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePageId" ADD CONSTRAINT "ServicePageId_servicePageId_fkey" FOREIGN KEY ("servicePageId") REFERENCES "ServicePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePageEn" ADD CONSTRAINT "ServicePageEn_servicePageId_fkey" FOREIGN KEY ("servicePageId") REFERENCES "ServicePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceId" ADD CONSTRAINT "ServiceId_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceEn" ADD CONSTRAINT "ServiceEn_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarGalleryId" ADD CONSTRAINT "CarGalleryId_carGalleryId_fkey" FOREIGN KEY ("carGalleryId") REFERENCES "CarGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarGalleryEn" ADD CONSTRAINT "CarGalleryEn_carGalleryId_fkey" FOREIGN KEY ("carGalleryId") REFERENCES "CarGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsNewsId" ADD CONSTRAINT "NewsNewsId_newsNewsId_fkey" FOREIGN KEY ("newsNewsId") REFERENCES "NewsNews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsNewsEn" ADD CONSTRAINT "NewsNewsEn_newsNewsId_fkey" FOREIGN KEY ("newsNewsId") REFERENCES "NewsNews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsCSRImage" ADD CONSTRAINT "NewsCSRImage_newsCSRId_fkey" FOREIGN KEY ("newsCSRId") REFERENCES "NewsCSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsCSRId" ADD CONSTRAINT "NewsCSRId_newsCSRId_fkey" FOREIGN KEY ("newsCSRId") REFERENCES "NewsCSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsCSREn" ADD CONSTRAINT "NewsCSREn_newsCSRId_fkey" FOREIGN KEY ("newsCSRId") REFERENCES "NewsCSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorPageId" ADD CONSTRAINT "InvestorPageId_investorPageId_fkey" FOREIGN KEY ("investorPageId") REFERENCES "InvestorPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorPageEn" ADD CONSTRAINT "InvestorPageEn_investorPageId_fkey" FOREIGN KEY ("investorPageId") REFERENCES "InvestorPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportCategoryId_fkey" FOREIGN KEY ("reportCategoryId") REFERENCES "ReportCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
