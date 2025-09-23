import React from "react";
import { Outlet } from "react-router";

const MessageLayout = () => {
  return (
    <div className="h-full w-full flex">
      <aside className="w-[25%] text-white">chats</aside>
      <div className="w-[75%] bg-red-500">
        <Outlet />
      </div>
    </div>
  );
};

export default MessageLayout;
