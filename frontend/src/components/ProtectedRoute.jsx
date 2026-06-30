import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const { loading, isAuthenticated } = useAuth();

    // Wait until authentication check finishes
    if (loading) {
        return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render protected page
    return children;
};

export default ProtectedRoute;