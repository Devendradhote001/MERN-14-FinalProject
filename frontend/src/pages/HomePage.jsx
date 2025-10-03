import React, { useEffect, useState } from "react";
import FollowCard from "../components/usersComponents/FollowCard";
import { axiosIntance } from "../config/axiosInstance";
import { getAllUsers } from "../apis/usersApis";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState(null);

  const fetchAllUsers = async () => {
    try {
      let res = await getAllUsers();
      if (res) {
        setAllUsers(res.allUsers);
      }
    } catch (error) {
      console.log("error in home all users api", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="text-white flex">
      <div className="w-[70%] h-[100%] bg-green-300">Home feed</div>

      <div className="px-4 py-10 flex flex-col gap-5">
        <h1>Suggested for you</h1>

        <div className="flex flex-col gap-5">
          {allUsers
            ? allUsers.map((elem) => {
                return <FollowCard key={elem._id} elem={elem} />;
              })
            : "There is no any users"}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
