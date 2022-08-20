import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
export const RequireAuth = ({ children }: { children: any }) => {
  const cookies = new Cookies();

  if (!cookies.get("token")) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};
