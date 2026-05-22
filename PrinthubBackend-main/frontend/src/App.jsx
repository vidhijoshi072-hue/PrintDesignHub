import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MarketplaceLayout from "./layouts/MarketplaceLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import BrowseDesignsPage from "./pages/BrowseDesignsPage";
import DesignDetailsPage from "./pages/DesignDetailsPage";
import DesignerDashboardPage from "./pages/DesignerDashboardPage";
import CompanyDashboardPage from "./pages/CompanyDashboardPage";
import UploadDesignPage from "./pages/UploadDesignPage";
import Cart from "./pages/Cart";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MarketplaceLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseDesignsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/design/:id" element={<DesignDetailsPage />} />
          <Route
            path="/designer-dashboard"
            element={
              <ProtectedRoute role="designer">
                <DesignerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute role="company">
                <CompanyDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute role="designer">
                <UploadDesignPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
