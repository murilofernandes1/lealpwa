import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Home from "../screens/Home/Home";
import Notices from "../screens/Notices/Notices";

import Services from "../screens/Services/Services";
import Login from "../screens/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
export default function AppNavigator() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/notices" element={<Notices />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
    </>
  );
}
