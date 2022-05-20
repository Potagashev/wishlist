import React, { useState } from "react";

import { useStore } from "effector-react";

import { CategoriesStore } from "../../../shared/types";
import { $categories } from "../model";

import CategoryOfProduct from "../categoryOfProduct/ui";

import c from "./style.module.scss";

//TODO: додавить крутилку, добавить получение категорий с сервера
const ListOfCategories: React.FC = () => {
  const { categories } = useStore<CategoriesStore>($categories);

  return (
    <div className={c.listOfCategoriesContainer}>
      <div className={c.titleBlock}>
        <h1 className={c.title}>Каталог подарков</h1>
        <h2>
          Подарки на любой вкус для самых разносторонних личностей, с учетом
          интересов и увлечений каждого.
        </h2>
        <hr className={c.hrSeparator} />
      </div>

      {categories.map((category) => {
        return (
          <CategoryOfProduct
            key={category.categoryId}
            categoryId={category.categoryId}
            categoryImg={category.categoryImg}
            categoryName={category.categoryName}
          />
        );
      })}
    </div>
  );
};

export default ListOfCategories;
