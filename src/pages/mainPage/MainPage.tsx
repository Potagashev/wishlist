import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useStore } from "effector-react";

import { Footer } from "widgets/footer";
import { Header } from "widgets/header";

import ListOfCategories from "../../entities/categoriesOfProduct/ui";

import {Container } from "@mui/material";

import {
  $categories,
  getCategories,
} from "../../entities/categoriesOfProduct/model";

import { $userToken } from "../../entities/siginInForm/model";

import { CategoriesStore } from "../../shared/types";

import svgPresentIcon from "../../app/icons/svgPresentIcon.svg";

import c from "./mainPage.module.scss";
import styles from "../../entities/siginInForm/ui/style.module.scss";

//TODO: align items - center; footer doesn't sticks properly
const MainPage: React.FC = () => {
  const { categories } = useStore<CategoriesStore>($categories);

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      console.log(localStorage.getItem("token"));

      getCategories();
    }
  }, [$userToken]);

  return (
    <div>
      <Header />
      <Container className={c.mainLayoutContainer}>
        <div className={c.mainLayoutContent}>
          <div className={c.welcomeBlock}>
            <h1>Добро пожаловать в WishList!</h1>

            <div className={c.startDoingBlock}>
              <img src={svgPresentIcon} />
              <h2>Приступить к выбору подарков</h2>
            </div>

            <div className={c.currentEvent}>
              <h3>Ближайшее событие: </h3>
              <span>
                28.03 <q>День Рождения</q>
              </span>
            </div>
          </div>
          <div className={c.navBlock}>
            <ul className={c.navItems}>
              <li className={c.navItem}>
                <NavLink className={styles.link} to={"/"}>
                  Личный кабинет
                </NavLink>
              </li>
              <li className={c.navItem}>
                <NavLink className={styles.link} to={"/"}>
                  Выбор подарков
                </NavLink>
              </li>
              <li className={c.navItem}>
                <NavLink className={styles.link} to={"/"}>
                  Друзья
                </NavLink>
              </li>
              <li className={c.navItem}>
                <NavLink className={styles.link} to={"/"}>
                  Ближайшие события
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <ListOfCategories categories={categories} />
      </Container>
      <Footer />
    </div>
  );
};

export default MainPage;
