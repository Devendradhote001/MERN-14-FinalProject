import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import HomePage from "../pages/HomePage";
import HomeLayout from "../layout/HomeLayout";
import ExplorePage from "../pages/ExplorePage";
import MessagesPage from "../pages/MessagesPage";
import MessageLayout from "../layout/MessageLayout";

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
