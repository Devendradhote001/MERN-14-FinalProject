import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Plus } from "lucide-react";
import { io } from "socket.io-client";

const MessagesPage = () => {
  const [messages, setMessages] = useState(null);
  const [sendMsg, setSendMsg] = useState(null);
  const socket = io("http://localhost:3000");
  console.log("socket---->", socket);
  const { id, name } = useParams();

  useEffect(() => {
    if (messages !== null) {
      socket.emit("chat", messages);
    }
  }, [sendMsg]);

  return (
    <div className="text-white flex flex-col justify-between h-full">
      <div className="flex gap-8 items-center border-b pb-2 border-gray-600">
        <div className="h-11 w-11 rounded-full border border-white overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <h1 className="capitalize font-bold text-xl">{name}</h1>
      </div>

      <div className="">messages here</div>
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-full bg-zinc-800 flex justify-center items-center cursor-pointer">
          <Plus />
        </div>
        <input
          type="text"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Type..."
          className="border rounded-full px-6 py-2 w-[75%]"
        />
        <button
          onClick={() => {
            setSendMsg(messages);
            alert("message send");
          }}
          className="px-4 py-2 bg-zinc-800 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
