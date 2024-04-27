import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    console.log("You are not logged in");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
