-- CreateEnum
CREATE TYPE "PowerGrade" AS ENUM ('FOURTH', 'THIRD', 'SECOND', 'FIRST', 'SPECIAL');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COMMON', 'BOSS');

-- CreateTable
CREATE TABLE "Enemy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "powerGrade" "PowerGrade" NOT NULL,
    "type" "Type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enemy_name_key" ON "Enemy"("name");
