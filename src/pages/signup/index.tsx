import React from "react";
import Header from "../../widgets/header/ui";
import Footer from "../../widgets/footer/ui";
import SignUpForm from "../../entities/signUpForm/ui";
import styles from "./style.module.scss";

const SignUp: React.FC = () => {
    return (
        <div className={styles.signUp}>
            <Header/>
            <SignUpForm/>
            <Footer/>
        </div>
    )
}
export default SignUp;