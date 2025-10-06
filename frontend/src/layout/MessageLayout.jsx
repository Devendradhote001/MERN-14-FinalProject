import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { axiosIntance } from "../config/axiosInstance";
import UserChat from "../components/usersComponents/UserChat";

const MessageLayout = () => {
  const [followings, setFollowings] = useState([]);

  const getAllFollowings = async () => {
    try {
      let res = await axiosIntance.get("/chats/all-followings");
      if (res) {
        console.log("followings--->", res);
        setFollowings(res.data.allFollowing.following);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllFollowings();
  }, []);

  return (
    <div className="h-full w-full flex">
      <aside className="w-[25%] p-4 border-r border-gray-600 text-white flex flex-col gap-5 px-5">
        {followings.map((elem) => {
          return <UserChat key={elem._id} elem={elem} />;
        })}
      </aside>
      <div className="w-[75%] p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MessageLayout;
