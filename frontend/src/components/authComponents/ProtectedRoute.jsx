import React, { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [user, dispatch]);

  return <Outlet />;
};

export default ProtectedRoute;
