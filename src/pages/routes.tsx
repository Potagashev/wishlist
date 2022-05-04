import React from "react";
import {Route, Routes} from "react-router-dom";
import {AppPages} from "../shared/lib";
import SignIn from "./signin";
import SignUp from "./signup";

const AppRoutes: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path={AppPages.AUTHORIZATION} element={<SignIn/>}/>
                <Route path={AppPages.REGISTRATION} element={<SignUp/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes;