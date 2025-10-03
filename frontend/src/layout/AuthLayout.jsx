import React, { useEffect, useState } from "react";
import Login from "../components/authComponents/Login";
import Register from "../components/authComponents/Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { user, isLoggedin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user !== null && isLoggedin) {
      navigate("/home");
    }
  }, [user, isLoggedin]);

  const [toggle, setToggle] = useState(true);

  return (
    <div className="h-screen w-screen">
      {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Register setToggle={setToggle} />
      )}
    </div>
  );
};

export default AuthLayout;
