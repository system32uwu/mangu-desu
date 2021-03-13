import axios from "axios";
import { Session } from "mangadex-api";

const baseUrl = "localhost:5000/api";

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
  return await axios.get(path, {
    params,
  });
}