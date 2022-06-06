import { BASE_URL } from "../config/indext";
import axios from "axios";

import { Category } from "../interfaces/category";

export const getPresentsCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/categories`);

    const categories: Category[] = response.data;

    return categories;

  } catch (error: unknown) {
    throw new Error();
  }
};
