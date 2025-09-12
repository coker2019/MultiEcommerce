import { Category } from "@/payload-types";

export type CustomCatgory = Category & {
    subcategories: Category[];
};