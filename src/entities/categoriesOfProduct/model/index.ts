import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
} from "effector";

import { CategoriesStore } from "../../../shared/types/index";
import { Category } from "../../../shared/interfaces/category";

import axios from "axios";

import { BASE_URL } from "../../../shared/config/indext";

export const $categories = createStore<CategoriesStore>({
  categories: [],
});

export const getCategories = createEvent();

export const getPresentsCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}api/v1/categories`,
      requestConfig
    );

    const categories: Category[] = response.data.results;
    console.log(categories);
    return categories;
  } catch (error: unknown) {
    throw new Error();
  }
};

export const fetchUserCategoriesFx = createEffect<void, Category[]>();
fetchUserCategoriesFx.use(getPresentsCategories);

export const $fetchError = restore<Error>(fetchUserCategoriesFx.failData, null);

$fetchError
  .on(fetchUserCategoriesFx.fail, (_, { error }) => error)
  .reset(fetchUserCategoriesFx.doneData);

export const $categoriesGetStatus = combine({
  loading: fetchUserCategoriesFx.pending,
  error: $fetchError,
  data: $categories,
});

forward({ from: getCategories, to: fetchUserCategoriesFx });

$categories.on(fetchUserCategoriesFx.doneData, (state, categories) => ({
  ...state,
  categories: categories,
}));

export const requestConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("token") },
};
