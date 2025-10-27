import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useStatusCheck } from "@/components/common/useStatusCheck";
const PrivateRoute = ({ children }) => {
  const { user, isLoadingUser } = useAuth();
  const location = useLocation();

  // console.log(user);

  // if (isLoadingUser) {
  //   return (
  //     <div className="flex flex-col gap-2 justify-center items-center h-screen bg-gray-900">
  //       <Loader2 className="w-10 h-10 text-white animate-spin" />
  //       <p className=" sm:text-2xl text-white">Checking session...</p>
  //     </div>
  //   );
  // }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
