-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);
