import React from "react";
import beauty_and_care from "../../../../app/icons/beauty_and_care.svg";
import buisness from "../../../../app/icons/buisness.svg";
import collecting from "../../../../app/icons/collecting.svg";
import dacha from "../../../../app/icons/dacha.svg";
import family_and_children from "../../../../app/icons/family_and_children.svg";
import fashion_and_style from "../../../../app/icons/fashion_and_style.svg";
import food_and_drinks from "../../../../app/icons/food_and_drinks.svg";
import games_and_toys from "../../../../app/icons/games_and_toys.svg";
import house from "../../../../app/icons/house.svg";
import humor_and_souvenirs from "../../../../app/icons/humor_and_souvenirs.svg";
import jewelry from "../../../../app/icons/jewelry.svg";
import other_sections from "../../../../app/icons/other_sections.svg";
import practical_things from "../../../../app/icons/practical_things.svg";
import romance from "../../../../app/icons/romance.svg";

import c from "./style.module.scss";

export interface IProps {
  categoryName: string;
  categoryImg: string;
}
//TODO: продумать расположение отдельных товаров, картинку, надпись, количество колонок и т.д.
const CategoryOfProduct: React.FC<IProps> = ({
  categoryName,
  categoryImg,
}: IProps) => {
  const matches = [
    { name: "beauty_and_care", image: beauty_and_care },
    { name: "buisness", image: buisness },
    { name: "collecting", image: collecting },
    { name: "dacha", image: dacha },
    { name: "family_and_children", image: family_and_children },
    { name: "fashion_and_style", image: fashion_and_style },
    { name: "food_and_drinks", image: food_and_drinks },
    { name: "games_and_toys", image: games_and_toys },
    { name: "house", image: house },
    { name: "humor_and_souvenirs", image: humor_and_souvenirs },
    { name: "other_sections", image: other_sections },
    { name: "jewelry", image: jewelry },
    { name: "practical_things", image: practical_things },
    { name: "romance", image: romance },
  ];

  const getMatchedName = (imageName: string) => {
    let matchForName;

    matches.forEach((match) => {
      if (match.name === imageName) {
        return (matchForName = match.image);
      }
    });

    return matchForName;
  };

  return (
    <div className={c.categoryContainer}>
      <div className={c.categoryContent}>
        <span className={c.categoryTitle}>{categoryName}</span>
        <img className={c.iconStyle} src={getMatchedName(categoryImg)} />
      </div>
    </div>
  );
};

export default CategoryOfProduct;
