import React from "react";
import { Route, Routes } from "react-router-dom";

import { useStore } from "effector-react";

import { AppPages } from "../shared/lib/routes";

import SignIn from "./signin";
import SignUp from "./signup";

import MainPage from "./mainPage/MainPage";

import { $userToken } from "../entities/siginInForm/model";

const AppRoutes: React.FC = () => {
  const userToken = useStore($userToken);

  if (userToken) {
    return (
      <div>
        <Routes>
          <Route path={AppPages.AUTHORIZATION} element={<SignIn />} />
          <Route path={AppPages.REGISTRATION} element={<SignUp />} />
          <Route path={AppPages.MAIN} element={<MainPage />} />
          <Route path={"*"} element={<MainPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path={AppPages.AUTHORIZATION} element={<SignIn />} />
        <Route path={AppPages.REGISTRATION} element={<SignUp />} />
        <Route path={"*"} element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
