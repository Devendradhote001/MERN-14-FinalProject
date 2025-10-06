import React, { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedin } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/home");
  //   } else {
  //     navigate("/");
  //   }
  // }, [user, dispatch]);

  if (!isLoggedin || !user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
