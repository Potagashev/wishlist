import React, {useState} from "react";
import styles from "./style.module.scss";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {NavLink} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {maxLength, requiredField} from "../../../shared/lib/validators";

interface ILogin {
    value: string,
    errors: any[] | never[]
}


const SignUpForm: React.FC = () => {
    const [value, setValue] = React.useState<Date | null>(null);
    const [password, setPassword] = useState<ILogin>({
        value: "",
        errors: []
    });
    const [showPassword, setShowPassword] = useState(false);
    const changePasswordState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) error.push(requiredField(value))
        else if (maxLength(value, 30) != true) error.push(maxLength(value, 30));
        setPassword({value: value, errors: error});
    }
    const changeShowPasswordState = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className={styles.signUpForm}>
            <div className={styles.signUpBlock}>
                <h1 className={styles.formHeader}>Зарегистрироваться</h1>
                <TextField id="input-with-sx"
                           label="Имя"
                           className={styles.firstName}
                           variant="standard"
                           sx={{width: 1, mt: 2, mb: 2}}/>
                <TextField id="input-with-sx"
                           label="Фамилия"
                           variant="standard"
                           className={styles.lastName}
                           sx={{width: 1, mb: 2}}/>
                <TextField id="input-with-sx"
                           label="Отчество"
                           variant="standard"
                           className={styles.patronymic}
                           sx={{width: 1, mb: 2}}/>
                <FormControl variant="standard" className={styles.city} sx={{width: 1}}>
                    <InputLabel id="demo-simple-select-standard-label">Пол</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        variant={"standard"}
                        id="demo-simple-select-filled"
                        label="Пол"
                        sx={{width: 1, mb: 2}}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Мужской</MenuItem>
                        <MenuItem value={2}>Женский</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" className={styles.city} sx={{width: 1, mb: 2}}>
                    <InputLabel id="demo-simple-select-standard-label">Город</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        variant={"standard"}
                        id="demo-simple-select-filled"
                        label="Город"
                        sx={{width: 1}}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Кемерово</MenuItem>
                        <MenuItem value={2}>Томск</MenuItem>
                        <MenuItem value={3}>Новокузнецк</MenuItem>
                        <MenuItem value={3}>Анжеро-Судженск</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        className={styles.dataPicker}
                        label="Дата рождения"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}

                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    id="standard-adornment-password"
                    sx={{width: 1, mb: 2, mt: 1}}
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    label={"Пароль"}
                    value={password.value}
                    onChange={event => changePasswordState(event.target.value)}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={changeShowPasswordState}>
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>)
                    }}
                />
                <TextField
                    id="standard-adornment-password"
                    sx={{width: 1, mb: 2}}
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    label={"Подтвердите пароль"}
                    value={password.value}
                    onChange={event => changePasswordState(event.target.value)}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={changeShowPasswordState}>
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>)
                    }}
                />
                <Button className={styles.button}  variant="contained">Войти</Button>
                <h1 className={styles.signUp}>У Вас уже есть аккаунт? <NavLink className={styles.link}
                                                                               to={"/"}>Авторизуйтесь</NavLink>
                </h1>
            </div>
        </div>
    )
}
export default SignUpForm;