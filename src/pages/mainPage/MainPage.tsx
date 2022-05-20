import React from "react";
import { NavLink } from "react-router-dom";

import svgPresentIcon from "../../app/icons/svgPresentIcon.svg";

import { Footer } from "widgets/footer";
import { Header } from "widgets/header";

import ListOfCategories from "../../entities/categoriesOfProduct/ui";

import c from "./mainPage.module.scss";
import styles from "../../entities/siginInForm/ui/style.module.scss";
import { Container } from "@mui/material";

//TODO: align items - center; footer doesn't sticks properly
const MainPage: React.FC = () => {
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
        <ListOfCategories />
      </Container>

      <Footer />
    </div>
  );
};

export default MainPage;
