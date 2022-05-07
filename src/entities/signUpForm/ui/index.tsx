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
    const [submitPassword, setSubmitPassword] = useState<ILogin>({
        value: "",
        errors: []
    });
    const [firstname, setFirstname] = useState({
        value: "",
        errors: []
    });
    const [secondname, setSecondname] = useState({
        value: "",
        errors: []
    });
    const [middlename, setMiddlename] = useState({
        value: "",
        errors: []
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showSubmitPassword, setShowSubmitPassword] = useState(false);
    const changeFirstnameState = (value: string) => {
        const error: never[] = [];
        setFirstname({value: value, errors: error});
    }
    const changeSecondnameState = (value: string) => {
        const error: never[] = [];
        setSecondname({value: value, errors: error});
    }
    const changeMiddlenameState = (value: string) => {
        const error: never[] = [];
        setMiddlename({value: value, errors: error});
    }

    const changePasswordState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) error.push(requiredField(value))
        else if (maxLength(value, 30) != true) error.push(maxLength(value, 30));
        setPassword({value: value, errors: error});
    }
    const changeSubmitPasswordState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) error.push(requiredField(value))
        else if (maxLength(value, 30) != true) error.push(maxLength(value, 30));
        setSubmitPassword({value: value, errors: error});
    }
    const changeShowPasswordState = () => {
        setShowPassword(!showPassword);
    }
    const changeShowSubmitPasswordState = () => {
        setShowSubmitPassword(!showSubmitPassword);
    }
    return (
        <div className={styles.signUpForm}>
            <div className={styles.signUpBlock}>
                <h1 className={styles.formHeader}>Зарегистрироваться</h1>
                <TextField id="input-with-sx"
                           label="Имя"
                           className={styles.firstName}
                           value={firstname.value}
                           onChange={event => changeFirstnameState(event.target.value)}
                           variant="standard"
                           sx={{width: 1, mt: 2, mb: 2}}/>
                <TextField id="input-with-sx"
                           value={secondname.value}
                           onChange={event => changeSecondnameState(event.target.value)}
                           label="Фамилия"
                           variant="standard"
                           className={styles.lastName}
                           sx={{width: 1, mb: 2}}/>
                <TextField id="input-with-sx"
                           value={middlename.value}
                           onChange={event=> changeMiddlenameState(event.target.value)}
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
                        <MenuItem value={1}>Мужской</MenuItem>
                        <MenuItem value={2}>Женский</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" className={styles.city} sx={{width: 1, mb: 2}}>
                    <InputLabel id="demo-simple-select-label">Город</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        variant={"standard"}
                        id="demo-simple-select"
                        label="Город"
                        sx={{width: 1}}>
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
                    type={showSubmitPassword ? 'text' : 'password'}
                    label={"Подтвердите пароль"}
                    value={submitPassword.value}
                    onChange={event => changeSubmitPasswordState(event.target.value)}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={changeShowSubmitPasswordState}>
                                {showSubmitPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>)
                    }}
                />
                <Button className={styles.button} variant="contained">Войти</Button>
                <h1 className={styles.signUp}>У Вас уже есть аккаунт? <NavLink className={styles.link}
                                                                               to={"/"}>Авторизуйтесь</NavLink>
                </h1>
            </div>
        </div>
    )
}
export default SignUpForm;