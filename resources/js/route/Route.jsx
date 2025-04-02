import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import ProtectedLoginRoutes from "../utils/protectedLoginRoutes";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import DetailLoker from "../pages/detailLoker/detailLoker";
import History from "../pages/history/history";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<ProtectedLoginRoutes><Login></Login></ProtectedLoginRoutes>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="*" element={<h1>404 Not Found</h1>}></Route>
            <Route path="/detail/:id" element={<DetailLoker></DetailLoker>}></Route>
            <Route path="/history" element={<History></History>}></Route>
        </Routes>
    )
}