import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedLoginRoutes({ children }) {
    const location = useLocation();
    const isAuthentication = useSelector((state) => state.checkLogin.isLoggedIn);

    console.log('ProtectedLoginRoutes', isAuthentication);

    if (isAuthentication.isLoggedIn === true) {
        return (
            <Navigate to="/" state={{ from: location }} replace />
        );
    } else {
        return children;
    }
}
