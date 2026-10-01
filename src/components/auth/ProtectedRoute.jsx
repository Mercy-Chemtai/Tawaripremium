// src/components/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Usage:
//   <Route path="/admin/blog" element={<ProtectedRoute requireStaff><BlogAdminPage /></ProtectedRoute>} />
//
// IMPORTANT: this checks `user.is_staff`. Your login response
// (AuthContext.login -> data.user) needs to actually include an
// `is_staff` field for this to work — check your Django LoginView's
// serializer includes it. If it's missing, add it there rather than
// making a second API call here.
export default function ProtectedRoute({ children, requireStaff = false }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireStaff && !user?.is_staff) {
    return <Navigate to="/" replace />;
  }

  return children;
}