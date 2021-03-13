import axios from "axios";
import { Session } from "mangadex-api";

const baseUrl = "http://localhost:5000/api";

export const loginWithMangaDex = (
  username: string,
  password: string,
  rememberMe: boolean
): Promise<Session> => {
  return ffetch<Session>(`${baseUrl}/auth/login`, {
    username,
    password,
    rememberMe,
  });
};

async function ffetch<T>(path: string, params: any): Promise<T> {
  let r;

  await axios
    .get(path, {
      params,
    })
    .then((res) => {
      if (res.data.err) {throw res.data.err}
      else r = res.data
    })

  return r;
}
