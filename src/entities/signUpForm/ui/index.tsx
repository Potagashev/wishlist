import React, {useState} from "react";
import styles from "./style.module.scss";
import {
    Alert,
    Box,
    Button, Collapse,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {NavLink, useNavigate} from "react-router-dom";
import {Close, Visibility, VisibilityOff} from "@mui/icons-material";
import {emailValidation, formatYmd, maxLength, minLength, requiredField} from "../../../shared/lib/validators";
import {userRegistration} from "../../../shared/api/http-querry";
import {AppPages} from "../../../shared/lib/routes";

interface ILogin {
    value: string,
    errors: any[]
}

interface SignUpFormProps {
    setLoading(value: boolean): void
}

const SignUpForm: React.FC<SignUpFormProps> = ({setLoading}) => {
    const navigate = useNavigate();
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
    const [userName, setUserName] = useState({
        value: "",
        errors: []
    });
    const [email, setEmail] = useState({
        value: "",
        errors: []
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showSubmitPassword, setShowSubmitPassword] = useState(false);
    const [city, setCity] = useState("");
    const [sex, setSex] = useState("");
    const [error, setError] = useState({state: false, text: ""})

    const changeFirstnameState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) {
            error.push(requiredField(value));
        } else if (maxLength(value, 30) != true) {
            error.push(maxLength(value, 30));
        }
        // @ts-ignore
        setFirstname({value: value, errors: error});
    }
    const changeSecondnameState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) {
            error.push(requiredField(value));
        } else if (maxLength(value, 30) != true) {
            error.push(maxLength(value, 30));
        }
        // @ts-ignore
        setSecondname({value: value, errors: error});
    }
    const changeUsernameState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) {
            error.push(requiredField(value));
        } else if (maxLength(value, 30) != true) {
            error.push(maxLength(value, 30));
        }
        // @ts-ignore
        setUserName({value: value, errors: error});
    }
    const changeEmailState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) {
            error.push(requiredField(value));
        } else if (maxLength(value, 30) != true) {
            error.push(maxLength(value, 30));
        } else if (emailValidation(value) != true) {
            error.push(emailValidation(value))
        }
        // @ts-ignore
        setEmail({value: value, errors: error});
    }

    const changePasswordState = (value: string) => {
        const error = [];
        if (requiredField(value) != true) error.push(requiredField(value))
        else if (maxLength(value, 30) != true) error.push(maxLength(value, 30));
        else if (minLength(value, 8) != true) error.push(minLength(value, 8));
        if (value !== submitPassword.value) {
            setSubmitPassword({value: submitPassword.value, errors: ["Пароли не совпадают!"]});
        }
        setPassword({value: value, errors: error});
    }
    const changeSubmitPasswordState = (value: string) => {
        const error = [];
        if (value !== password.value) {
            error.push("Пароли не совпадают!");
        }
        setSubmitPassword({value: value, errors: error});
    }
    const changeShowPasswordState = () => {
        setShowPassword(!showPassword);
    }
    const changeShowSubmitPasswordState = () => {
        setShowSubmitPassword(!showSubmitPassword);
    }

    const handleSumnit = async () => {
        setLoading(true);
        if (firstname.errors.length > 0 || secondname.errors.length > 0 || userName.errors.length > 0 ||
            password.errors.length > 0 || submitPassword.errors.length > 0 || value === null ||
            sex === "" || city == "" || email.errors.length > 0) {
            setError({state: true, text: "Есть незаполненные поля или поля с ошибками!"})
        } else if (requiredField(firstname.value) != true || requiredField(secondname.value) != true || requiredField(userName.value) != true
            || requiredField(password.value) != true || requiredField(submitPassword.value) != true || requiredField(email.value) != true) {
            setError({state: true, text: "Есть незаполненные поля или поля с ошибками!"})
        } else {
            setError({state: false, text: ""});
            const data = {
                first_name: firstname.value,
                last_name: secondname.value,
                username: userName.value,
                gender: sex,
                city: city,
                email: email.value,
                b_date: formatYmd(value),
                password: password.value,
                re_password: submitPassword.value
            }
            console.log(data)
            const response = await userRegistration(data).then(
                response => {
                    if (response.ok) {
                        setError({state: false, text: ""})
                        localStorage.setItem("alreadySignUp", "true");
                        navigate(AppPages.AUTHORIZATION);
                    } else {
                        // @ts-ignore
                        response.json().then(data => setError({state: true, text: data[Object.keys(data)[0]]}));
                    }
                }
            )


        }
        setLoading(false);
    }
    return (
        <div className={styles.signUpForm}>
            <Box sx={{width: '100%'}} className={styles.failWindow}>
                <Collapse in={error.state}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setError({state: false, text: ""});
                                }}
                            >
                                <Close fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        {error.text}
                    </Alert>
                </Collapse>
            </Box>
            <div className={styles.signUpBlock}>
                <h3 className={styles.formHeader}>Зарегистрироваться</h3>
                {firstname.errors.length === 0 ?
                    <TextField id="input-with-sx"
                               label="Имя"
                               className={styles.firstName}
                               value={firstname.value}
                               onChange={event => changeFirstnameState(event.target.value)}
                               variant="standard"
                               sx={{width: 1, mt: 2, mb: 2}}/> :
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label="Имя"
                        sx={{width: 1}}
                        value={firstname.value}
                        onChange={event => changeFirstnameState(event.target.value)}
                        helperText={firstname.errors[0]}
                        variant="standard"
                    />}
                {secondname.errors.length === 0 ?
                    <TextField id="input-with-sx"
                               value={secondname.value}
                               onChange={event => changeSecondnameState(event.target.value)}
                               label="Фамилия"
                               variant="standard"
                               className={styles.lastName}
                               sx={{width: 1, mb: 2}}/> :
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label="Фамилия"
                        sx={{width: 1}}
                        value={secondname.value}
                        onChange={event => changeSecondnameState(event.target.value)}
                        helperText={secondname.errors[0]}
                        variant="standard"
                    />}
                {userName.errors.length === 0 ?
                    <TextField id="input-with-sx"
                               value={userName.value}
                               onChange={event => changeUsernameState(event.target.value)}
                               label="Никнейм"
                               variant="standard"
                               className={styles.patronymic}
                               sx={{width: 1, mb: 2}}/> :
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label="Никнейм"
                        sx={{width: 1}}
                        value={userName.value}
                        onChange={event => changeUsernameState(event.target.value)}
                        helperText={userName.errors[0]}
                        variant="standard"
                    />
                }
                {email.errors.length === 0 ?
                    <TextField id="input-with-sx"
                               label="Почта"
                               className={styles.firstName}
                               value={email.value}
                               onChange={event => changeEmailState(event.target.value)}
                               variant="standard"
                               sx={{width: 1, mb: 2}}/> :
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label="Почта"
                        sx={{width: 1}}
                        value={email.value}
                        onChange={event => changeEmailState(event.target.value)}
                        helperText={email.errors[0]}
                        variant="standard"
                    />}

                <FormControl variant="standard" className={styles.city} sx={{width: 1}}>
                    <InputLabel id="demo-simple-select-standard-label">Пол</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        variant={"standard"}
                        id="demo-simple-select-filled"
                        label="Пол"
                        value={sex}
                        onChange={(event) => setSex(event.target.value)}
                        sx={{width: 1, mb: 2}}>
                        <MenuItem value={"Man"}>Мужской</MenuItem>
                        <MenuItem value={"Woman"}>Женский</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" className={styles.city} sx={{width: 1, mb: 2}}>
                    <InputLabel id="demo-simple-select-label">Город</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        variant={"standard"}
                        id="demo-simple-select"
                        label="Город"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        sx={{width: 1}}>
                        <MenuItem value={"Кемерово"}>Кемерово</MenuItem>
                        <MenuItem value={"Томск"}>Томск</MenuItem>
                        <MenuItem value={"Новокузнецк"}>Новокузнецк</MenuItem>
                        <MenuItem value={"Анжеро-Судженск"}>Анжеро-Судженск</MenuItem>
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
                {password.errors.length === 0 ?
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
                    /> :
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label={"Пароль"}
                        type={showPassword ? 'text' : 'password'}
                        sx={{width: 1, mb: 2, mt: 1}}
                        value={password.value}
                        onChange={event => changePasswordState(event.target.value)}
                        helperText={password.errors[0]}
                        variant="standard"
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
                }
                {submitPassword.errors.length === 0 ?
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
                    /> :
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label={"Подтвердите пароль"}
                        type={showSubmitPassword ? 'text' : 'password'}
                        sx={{width: 1, mb: 2, mt: 1}}
                        value={submitPassword.value}
                        onChange={event => changeSubmitPasswordState(event.target.value)}
                        helperText={submitPassword.errors[0]}
                        variant="standard"
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
                }

                <Button className={styles.button} variant="contained" onClick={handleSumnit}>Войти</Button>
                <h1 className={styles.signUp}>У Вас уже есть аккаунт? <NavLink className={styles.link}
                                                                               to={"/"}>Авторизуйтесь</NavLink>
                </h1>
            </div>
        </div>
    )
}
export default SignUpForm;