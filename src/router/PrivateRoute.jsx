import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

 console.log(user)
  // If user or email is not available, redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If user.email is available, check profile completion

  // If everything is okay, render the children
  return children;
};

export default PrivateRoute;