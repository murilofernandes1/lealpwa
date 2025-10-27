import { Navigate, Outlet } from "react-router-dom";
import TabNavigator from "../components/TabNavigator/TabNavigator";
export default function PrivateRoutes() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <>
      <Outlet />
      <TabNavigator />
    </>
  );
}
