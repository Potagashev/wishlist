import {BASE_URL} from "../config/indext";

export const userAuth = async (login: string, password: string) => {
    const request = await fetch(`${BASE_URL}auth/token/login/`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"

        },
        body: JSON.stringify({
            "username": login,
            "password": password
        })

    })
    return request;
}

export const userRegistration = async (userData: object) => {
    const request = await fetch(`${BASE_URL}api/v1/auth/users/`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"

        },
        body: JSON.stringify(userData)
    })
    return request;
}
