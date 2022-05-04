import React, {useState} from "react";
import styles from "./style.module.scss";
import {Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {maxLength, requiredField} from "../../../shared/lib/validators";

interface ILogin {
    value: string,
    errors: any[] | never[]
}

const SignInForm: React.FC = () => {
    const [login, setLogin] = useState<ILogin>({
        value: "",
        errors: []
    });
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const changeLoginState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) error.push(requiredField(value))
        else if (maxLength(value, 30) != true) error.push(maxLength(value, 30));
        setLogin({
            value: value,
            errors: error
        });
    }
    const changePasswordState = (value: string) => {
        setPassword(value);
    }
    const changeShowPasswordState = () => {
        setShowPassword(!showPassword);
    }
    console.log(login.errors)
    return (
        <div className={styles.signInForm}>
            <div className={styles.signInBlock}>
                <h1 className={styles.formHeader}>Войти</h1>
                <div>
                    <Box fontFamily={"Gilroy"} sx={{display: 'flex', alignItems: 'flex-end', width: 1}}>
                        {login.errors.length === 0 ?
                            <TextField id="input-with-sx" value={login.value}
                                       onChange={event => changeLoginState(event.target.value)}
                                       label="Логин"
                                       variant="standard" sx={{width: 1}}/> :
                            <TextField
                                error
                                id="standard-error-helper-text"
                                label="Логин"
                                sx={{width: 1}}
                                defaultValue={login.value}
                                onChange={event => changeLoginState(event.target.value)}
                                helperText={login.errors[0]}
                                variant="standard"
                            />}

                    </Box>

                </div>
                <div className={styles.password}>
                    <FormControl sx={{width: 1}} variant="outlined">
                        <InputLabel variant={"standard"} htmlFor="standard-adornment-password">Пароль</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={event => changePasswordState(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={changeShowPasswordState}>
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
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