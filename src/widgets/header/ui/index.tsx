import React from "react";
import styles from "./style.module.scss";
import NotesIcon from '@mui/icons-material/Notes';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <NotesIcon fontSize={"small"}/>
            <span className={styles.headerTitle}>WishList</span>
        </header>
    )
}
export default Header;