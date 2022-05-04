export const requiredField = (value: string) => {
    return value.length > 0 ? true : "Это обязательное поле!";
}

export const maxLength = (value: string, len: number) => {
    return value.length > len ? `Длина поля превышает ${len} символов!` : true;
}
