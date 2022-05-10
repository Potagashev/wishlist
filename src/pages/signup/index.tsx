import React, {useState} from "react";
import Header from "../../widgets/header/ui";
import Footer from "../../widgets/footer/ui";
import SignUpForm from "../../entities/signUpForm/ui";
import styles from "./style.module.scss";
import {CircularProgress} from "@mui/material";

const SignUp: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <div className={isLoading ? styles.signupLoading : styles.signUp}>
                <Header/>
                <SignUpForm setLoading={setIsLoading}/>
                <Footer/>
            </div>
            {isLoading ? <div className={styles.loadingModal}>
                <CircularProgress/>
            </div> : null}
        </div>
    )
}
export default SignUp;