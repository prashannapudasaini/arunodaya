import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the token exists in localStorage
  const isAuthenticated = localStorage.getItem('adminToken');
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but save the location they were trying to access 
    // so we can send them there after a successful login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components (the Dashboard)
  return children;
};

export default ProtectedRoute;