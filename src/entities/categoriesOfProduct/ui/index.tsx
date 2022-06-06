import React, { useEffect } from "react";

import { $categoriesGetStatus } from "../model";
import { useStore } from "effector-react";

import { Category } from "../../../shared/interfaces/category";
import CategoryOfProduct from "../categoryOfProduct/ui";
import { Matches } from "../../../shared/helpers/Matches";

import { CircularProgress } from "@mui/material";

import c from "./style.module.scss";

interface IProps {
  categories: Category[];
}

const ListOfCategories: React.FC<IProps> = ({ categories }: IProps) => {
  useEffect(() => {}, [categories]);

  const { loading } = useStore($categoriesGetStatus);

  const categoriesOfProducts = (
    <div className={c.categoriesTable}>
      {categories.map((category, number) => {
        return (
          <CategoryOfProduct
            key={number}
            categoryName={category.category_name}
            categoryImg={Matches.matchParams(category.name)}
          />
        );
      })}
    </div>
  );

  const preloaderContainer = (
    <div className={c.preloaderContainer}>
      <CircularProgress />
    </div>
  );

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
      {!loading ? categoriesOfProducts : preloaderContainer}
    </div>
  );
};

export default ListOfCategories;
