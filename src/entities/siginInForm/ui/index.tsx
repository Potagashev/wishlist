import React from "react";
import styles from "./style.module.scss";
import {Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import {NavLink} from "react-router-dom";

const SignInForm: React.FC = () => {
    return (
        <div className={styles.signInForm}>
            <div className={styles.signInBlock}>
                <h1 className={styles.formHeader}>Войти</h1>
                <div>
                    <Box fontFamily={"Gilroy"} sx={{display: 'flex', alignItems: 'flex-end', width: 1}}>
                        <TextField id="input-with-sx" label="Логин" variant="standard" sx={{width: 1}}/>
                    </Box>

                </div>
                <div className={styles.password}>
                    <FormControl sx={{width: 1}} variant="outlined">
                        <InputLabel variant={"standard"} htmlFor="standard-adornment-password">Пароль</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={'text'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility">
                                        {<Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <Button className={styles.button} variant="contained">Войти</Button>
                <h1 className={styles.signUp}>У Вас еще нет аккаунта? <NavLink className={styles.link}
                                                                               to={"/signUp"}>Зарегистрируйтесь</NavLink>
                </h1>
            </div>

        </div>
    )
}
export default SignInForm;