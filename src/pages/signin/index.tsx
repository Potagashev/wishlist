import React, {useState} from "react";

import SignInForm from "../../entities/siginInForm/ui";
import styles from "./style.module.scss";
import {CircularProgress} from "@mui/material";
import {Header} from "widgets/header";
import {Footer} from "widgets/footer";
import {signInFx} from "entities/siginInForm/model";
import {useStore} from "effector-react";

const SignIn: React.FC = () => {
    const isLoading = useStore(signInFx.pending);
    return (
        <div>
            <div className={isLoading ? styles.signinLoading : styles.signin}>
                <Header/>
                <SignInForm/>
                <Footer/>
            </div>
            {isLoading ? <div className={styles.loadingModal}>
                <CircularProgress/>
            </div> : null}

        </div>
    )
}

export default SignIn;