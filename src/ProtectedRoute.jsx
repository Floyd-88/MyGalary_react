import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token_gallery");
  return token ? element : <Navigate to="/MyGalary_react/" />;
};

export default ProtectedRoute;