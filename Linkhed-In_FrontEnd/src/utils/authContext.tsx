import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";
interface AuthContextInterface {
  user: any;
  login: any;
  logout: any;
}
const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  const login = (user: any) => {
    setUser(user);
  };

  const logout = async () => {
    cookies.remove("token", { path: "/" });
    setUser(null);
  };
  const authContextData: AuthContextInterface = {
    user: user,
    login: login,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
