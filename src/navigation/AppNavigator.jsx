import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes.js";
import Home from "../screens/Home/Home.Jsx";
import Notices from "../screens/Notices/Notices.js";

import Services from "../screens/Services/Services.js";
import Login from "../screens/Login/Login.js";
import PrivateRoutes from "./PrivateRoutes.js";
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
