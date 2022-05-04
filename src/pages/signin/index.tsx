import React from "react";
import Header from "../../widgets/header/ui";
import Footer from "../../widgets/footer/ui";
import SignInForm from "../../entities/siginInForm/ui";
import styles from "./style.module.scss";

const SignIn: React.FC = () => {
    return (
        <div className={styles.signin}>
            <Header/>
            <SignInForm/>
            <Footer/>
        </div>
    )
}

export default SignIn;