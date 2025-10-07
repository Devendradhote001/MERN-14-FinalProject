import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { axiosIntance } from "./config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "./features/reducers/authSlice";
import { useNavigate } from "react-router";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let res = await axiosIntance.get("/auth/me");
        if (res) {
          dispatch(addUser(res.data.user));
        }
      } catch (error) {
        console.log("error in app /me api", error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="min-h-screen w-screen bg-black">
      <AppRouter />
    </div>
  );
};

export default App;
