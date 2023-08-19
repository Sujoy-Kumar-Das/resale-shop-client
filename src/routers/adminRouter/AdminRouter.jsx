import React, { useContext } from "react";
import useAdmin from "../../hooks/useAdmin";
import Spiner from "../../pages/shared/spiner/Spiner";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";

const AdminRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContextProvider);
  const [isAdmin, adminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (adminLoading || loading) {
    return <Spiner></Spiner>;
  }
  if (user && isAdmin) {
    return children;
  } else {
    return (
      <Navigate
        state={{ from: location }}
        replace
        to={"/registration/login"}
      ></Navigate>
    );
  }
};

export default AdminRouter;
