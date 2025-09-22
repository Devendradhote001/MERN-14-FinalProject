import React, { useState } from "react";
import Login from "../components/authComponents/Login";
import Register from "../components/authComponents/Register";

const AuthLayout = () => {
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
