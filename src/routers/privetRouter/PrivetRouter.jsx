import React, { useContext } from "react";
import { AuthContextProvider } from "../../contexts/authContext/AuthContext";
import Spiner from "../../pages/shared/spiner/Spiner";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContextProvider);
  const location = useLocation();
  if (loading) {
    return <Spiner></Spiner>;
  }
  if (user && user?.uid) {
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

export default PrivetRouter;
