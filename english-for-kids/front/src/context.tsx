import { createContext } from "react";

type Context = {
    token: string | null,
   userId: string | null,
    login: (jwtToken: string, id: string) => void
    logout: () => void;
    isAuthenticated: boolean
}

const context = createContext<Context>({
  isAuthenticated: false,
  login(jwtToken: string, id: string): void {
    id.toString();
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout(): void {
  },
  token: "",
  userId: "",
});

export default context;
