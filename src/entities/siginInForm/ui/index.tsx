import React, { useState } from "react";
import styles from "./style.module.scss";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { maxLength, requiredField } from "../../../shared/lib/validators";
import { userAuth } from "../../../shared/api/http-querry";
import { AppPages } from "../../../shared/lib/routes";

interface ILogin {
  value: string;
  errors: any[] | never[];
}

interface SignInFormsProps {
  setLoading(value: boolean): void;
}

const SignInForm: React.FC<SignInFormsProps> = ({ setLoading }) => {
  const [login, setLogin] = useState<ILogin>({
    value: "",
    errors: [],
  });
  const [password, setPassword] = useState<ILogin>({
    value: "",
    errors: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [alreadySignUp, setAlreadySignUp] = useState(
    localStorage.getItem("alreadySignUp") ? true : false
  );
  const navigate = useNavigate();
  const changeLoginState = (value: string) => {
    const error = [];
    if (requiredField(value) != true) error.push(requiredField(value));
    else if (maxLength(value, 30) != true) error.push(maxLength(value, 30));
    setLogin({
      value: value,
      errors: error,
    });
  };
  const changePasswordState = (value: string) => {
    const error = [];
    if (requiredField(value) != true) error.push(requiredField(value));
    else if (maxLength(value, 30) != true) error.push(maxLength(value, 30));

    setPassword({ value: value, errors: error });
  };
  const changeShowPasswordState = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (requiredField(login.value) != true) {
      setLogin({ ...login, errors: [requiredField(login.value)] });
    } else if (requiredField(password.value) != true) {
      setPassword({ ...password, errors: [requiredField(password.value)] });
    } else {
      const request = await userAuth(login.value, password.value).then(
        (response) => {
          if (response.ok) {
            response.json().then((token) => {
              setOpen(false);
              localStorage.setItem("token", token.auth_token);
            });
            navigate(AppPages.MAIN);
          } else {
            setOpen(true);
          }
        }
      );
    }
    setLoading(false);
  };
  return (
    <div className={styles.signInForm}>
      <Box sx={{ width: "100%" }} className={styles.failWindow}>
        <Collapse in={open}>
          <Alert
            severity={"error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Неверный логин или пароль!
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ width: "100%" }} className={styles.failWindow}>
        <Collapse in={alreadySignUp}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  localStorage.removeItem("alreadySignUp");
                  setAlreadySignUp(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Аккаунт успешно создан!
          </Alert>
        </Collapse>
      </Box>
      <div className={styles.signInBlock}>
        <h1 className={styles.formHeader}>Войти</h1>
        <div>
          <FormControl sx={{ width: 1 }} variant="outlined">
            {login.errors.length === 0 ? (
              <TextField
                id="input-with-sx"
                value={login.value}
                onChange={(event) => changeLoginState(event.target.value)}
                label="Логин"
                variant="standard"
                sx={{ width: 1 }}
              />
            ) : (
              <TextField
                error
                id="standard-error-helper-text"
                label="Логин"
                sx={{ width: 1 }}
                value={login.value}
                onChange={(event) => changeLoginState(event.target.value)}
                helperText={login.errors[0]}
                variant="standard"
              />
            )}
          </FormControl>
        </div>
        <div className={styles.password}>
          <FormControl sx={{ width: 1 }} variant="outlined">
            {password.errors.length === 0 ? (
              <>
                <InputLabel
                  variant={"standard"}
                  htmlFor="standard-adornment-password"
                >
                  Пароль
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password.value}
                  onChange={(event) => changePasswordState(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={changeShowPasswordState}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </>
            ) : (
              <>
                <TextField
                  error
                  id="standard-error-helper-text"
                  helperText={password.errors[0]}
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  label={"Пароль"}
                  value={password.value}
                  onChange={(event) => changePasswordState(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={changeShowPasswordState}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
          </FormControl>
        </div>
        <Button
          className={styles.button}
          onClick={handleSubmit}
          variant="contained"
        >
          Войти
        </Button>
        <h1 className={styles.signUp}>
          У Вас еще нет аккаунта?{" "}
          <NavLink className={styles.link} to={"/signUp"}>
            Зарегистрируйтесь
          </NavLink>
        </h1>
      </div>
    </div>
  );
};
export default SignInForm;
