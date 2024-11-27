-- CreateEnum
CREATE TYPE "Status" AS ENUM ('todo', 'doing', 'done');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "priority" "Priority" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
