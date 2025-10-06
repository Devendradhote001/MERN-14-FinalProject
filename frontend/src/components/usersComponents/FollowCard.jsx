import React from "react";
import { axiosIntance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const FollowCard = ({ elem }) => {
  const navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);

  const handleFollow = async () => {
    try {
      let response = await axiosIntance.get(`/users/follow/${elem._id}`);
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.log("error while following user", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      let response = await axiosIntance.get(`/users/unfollow/${elem._id}`);
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.log("error while following user", error);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="h-11 w-11 rounded-full border border-white overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div>
        <h1>{elem.username}</h1>
        <p>{elem.fullName}</p>
      </div>

      <div>
        {user.following.includes(elem._id) ? (
          <button
            onClick={handleUnfollow}
            className="bg-blue-500 text-white px-4 py-1 rounded-md cursor-pointer"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="bg-blue-500 text-white px-4 py-1 rounded-md cursor-pointer"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default FollowCard;
