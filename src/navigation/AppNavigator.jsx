import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes.jsx";
import Home from "../screens/Home/Home.Jsx";
import Notices from "../screens/Notices/Notices.jsx";

import Services from "../screens/Services/Services.jsx";
import Login from "../screens/Login/Login.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
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
