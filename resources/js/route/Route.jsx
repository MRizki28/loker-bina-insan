import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            
        </Routes>
    )
}