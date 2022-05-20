import { SubCategory } from "./subCategory";

export interface Category {
  categoryId: number;
  categoryName: string;
  listOfSubCategories: SubCategory[];
  categoryImg: string;
}

