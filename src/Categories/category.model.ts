import { Prisma } from "@prisma/client";

export class Categories implements Prisma.CategoriesCreateInput {
    name: string;
    score: number;
    action?: string;
} 