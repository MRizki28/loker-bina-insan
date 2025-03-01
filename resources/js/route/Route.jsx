import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import ProtectedLoginRoutes from "../utils/protectedLoginRoutes";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<ProtectedLoginRoutes><Login></Login></ProtectedLoginRoutes>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
    )
}