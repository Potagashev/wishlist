import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
  Store,
} from "effector";

import { CategoriesStore } from "../../../shared/types/index";

export const $categories = createStore<CategoriesStore>({
  categories: [
    {
      categoryId: 232,
      categoryImg: "Adsadad",
      categoryName: "Говно",
      listOfSubCategories: [],
    },

    {
      categoryId: 232,
      categoryImg: "Adsadad",
      categoryName: "Хуй",
      listOfSubCategories: [],
    },
    {
      categoryId: 232,
      categoryImg: "Adsadad",
      categoryName: "Жопа",
      listOfSubCategories: [],
    },
    {
      categoryId: 232,
      categoryImg: "Adsadad",
      categoryName: "Пизда",
      listOfSubCategories: [],
    },
  ],
});
