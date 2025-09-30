import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import HomePage from "../pages/HomePage";
import HomeLayout from "../layout/HomeLayout";
import ExplorePage from "../pages/ExplorePage";
import MessagesPage from "../pages/MessagesPage";
import MessageLayout from "../layout/MessageLayout";
import { useSelector } from "react-redux";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
    },
    {
      path: "/home",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "explore",
          element: <ExplorePage />,
        },
        {
          path: "messages",
          element: <MessageLayout />,
          children: [
            {
              path: "",
              element: <MessagesPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
