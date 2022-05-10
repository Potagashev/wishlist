import React from "react";
import {Route, Routes} from "react-router-dom";
import {AppPages} from "../shared/lib/routes";
import SignIn from "./signin";
import SignUp from "./signup";
import MainPage from "./mainPage/MainPage";

const AppRoutes: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path={AppPages.AUTHORIZATION} element={<SignIn/>}/>
                <Route path={AppPages.REGISTRATION} element={<SignUp/>}/>
                <Route path={AppPages.MAIN} element={<MainPage/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes;