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