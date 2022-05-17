import React, {useState} from "react";

import SignInForm from "../../entities/siginInForm/ui";
import styles from "./style.module.scss";
import {CircularProgress} from "@mui/material";
import {Header} from "widgets/header";
import {Footer} from "widgets/footer";

const SignIn: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div>
            <div className={isLoading ? styles.signinLoading : styles.signin}>
                <Header/>
                <SignInForm setLoading={setIsLoading}/>
                <Footer/>
            </div>
            {isLoading ? <div className={styles.loadingModal}>
                <CircularProgress/>
            </div> : null}

        </div>
    )
}

export default SignIn;