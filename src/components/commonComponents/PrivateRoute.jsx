import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
