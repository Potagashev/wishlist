import React from "react";
import styles from "./style.module.scss";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <span>&copy; 2022 Tomsk Polytechnic University</span>
        </footer>
    )
}
export default Footer;