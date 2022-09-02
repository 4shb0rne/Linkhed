import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
export const GuestAuth = ({ children }: { children: any }) => {
  const cookies = new Cookies();

  if (cookies.get("token")) {
    return <Navigate to="/home"></Navigate>;
  }

  return children;
};
