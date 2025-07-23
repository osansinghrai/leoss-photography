-- CreateTable
CREATE TABLE "contact_page" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "messages" VARCHAR(255) NOT NULL,

    CONSTRAINT "contact_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_page" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "experience" VARCHAR(255) NOT NULL,
    "skills" VARCHAR(255) NOT NULL,
    "awards" VARCHAR(255) NOT NULL,
    "accomplishment" VARCHAR(255) NOT NULL,

    CONSTRAINT "experience_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_page" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image_url" TEXT NOT NULL,
    "image_public_id" TEXT NOT NULL,

    CONSTRAINT "portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_page" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "image_url" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,

    CONSTRAINT "galary_page_pkey" PRIMARY KEY ("id")
);
