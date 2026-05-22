import { Navigate, useLocation } from "react-router-dom";
import { useAppState } from "../hooks/useAppState";

function ProtectedRoute({ children, role }) {
  const { currentUser } = useAppState();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ redirectTo: location.pathname }} />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === "designer" ? "/designer-dashboard" : "/company-dashboard"} replace />;
  }

  return children;
}

export default ProtectedRoute;
