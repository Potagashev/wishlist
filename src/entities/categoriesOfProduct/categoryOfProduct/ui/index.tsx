import React from "react";

import c from "./style.module.scss";

export interface IProps {
  categoryName: string;
  categoryId: null | number;
  categoryImg: string;
}
//TODO: продумать расположение отдельных товаров, картинку, надпись, количество колонок и т.д.
const CategoryOfProduct: React.FC<IProps> = ({
  categoryName,
  categoryId,
  categoryImg,
}: IProps) => {
  return (
    <div className={c.categoryContainer}>
      <span>{categoryName}</span>
    </div>
  );
};

export default CategoryOfProduct;
