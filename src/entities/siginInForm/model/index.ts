import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";

import { userAuth } from "shared/api/http-querry";

import { SignInFormType } from "shared/lib/types";

export const $userToken = createStore<null | string | undefined>(null);

export const updateToken = createEvent<SignInFormType>();

export const signInFx = createEffect(
  async (user: SignInFormType) => await userAuth(user.login, user.password)
);

export const setToken = createEvent<string | null>();

$userToken.on(setToken, (_, value) => value);

forward({
  from: updateToken,
  to: signInFx,
});

sample({
  clock: signInFx.doneData,
  fn: (token) => token.auth_token,
  target: $userToken,
});

sample({
  clock: signInFx.failData,
  fn: () => "error",
  target: $userToken,
});
