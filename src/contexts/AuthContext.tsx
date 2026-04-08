import { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../types";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "../api/axios";

interface AuthContext {
  token: string;
  setToken: (s: string) => void;
  user: IUser | null;
  logout: () => void;
}
export const AuthContext = createContext({} as AuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState<IUser | null>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ["Auth", token],
    queryFn: () => axiosApi.get<IUser>("/auth/profile").then((res) => res.data),
    enabled: !!token,
  });

  function logout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  }

  useEffect(() => {
    if (token && isSuccess) {
      setUser(data);
    }
  }, [token, isSuccess]);

  console.log(user);

  return (
    <AuthContext.Provider value={{ token, setToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
