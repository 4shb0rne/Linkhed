import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
export const RequireAuth = ({ children }: { children: any }) => {
  const cookies = new Cookies();

  if (!cookies.get("token")) {
    console.log("wtf")
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};
