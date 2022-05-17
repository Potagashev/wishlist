export const requiredField = (value: string) => {
  return value.length > 0 ? true : "Это обязательное поле!";
};

export const maxLength = (value: string, len: number) => {
  return value.length > len ? `Длина поля превышает ${len} символов!` : true;
};

export const minLength = (value: string, len: number) => {
  return value.length < len ? `Длина поля меньше ${len} символов!` : true;
};
export const emailValidation = (value: string): string | boolean => {
  const regexp: RegExp =
    /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/g;
  if (value.match(regexp)) return true;
  return "Поле должно соответствовать условиям почты";
};
// @ts-ignore
export const formatYmd = (date: Date | null) => date.toISOString().slice(0, 10);
