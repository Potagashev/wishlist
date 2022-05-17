import React from "react";
import styles from "./style.module.scss";
import NotesIcon from '@mui/icons-material/Notes';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <NotesIcon fontSize={"small"}/>
            <h1 className={styles.headerTitle}>WishList</h1>
        </header>
    )
}
