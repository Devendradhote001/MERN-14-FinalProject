import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UserChat = ({ elem }) => {
  const navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);

  return (
    <div
      onClick={() =>
        navigate(`/home/messages/chat/${elem._id}/${elem.fullName}`)
      }
      className="flex items-center gap-4 border-b border-gray-600 w-full px-2 py-2 cursor-pointer"
    >
      <div className="h-11 w-11 rounded-full border border-white overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div>
        <p>{elem.fullName}</p>
      </div>
    </div>
  );
};

export default UserChat;
