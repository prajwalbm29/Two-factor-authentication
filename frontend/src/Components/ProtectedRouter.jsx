import { Outlet, Navigate } from "react-router-dom";
import { UserSession } from "../Context/SessionContext";

function ProtectedRouter() {
    const { isLoggedIn } = UserSession();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRouter