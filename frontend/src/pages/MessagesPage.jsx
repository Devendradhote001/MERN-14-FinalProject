import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Plus } from "lucide-react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const MessagesPage = () => {
  const [allMessages, setAllMessages] = useState([]);
  console.log("all mesgs--->", allMessages);
  const [messages, setMessages] = useState("");
  const [socket_id, setSocket_id] = useState(null);
  console.log("your socket id", socket_id);
  const { user } = useSelector((state) => state.auth);
  const { id, name } = useParams();
  const socket = useMemo(() => io("http://localhost:3000"), [id]);

  const chatUsers = {
    roomId: [user._id, id].sort().join("_"),
    sender_id: user._id,
    receiver_id: id,
    socket_id,
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log("connected with socket");
    };

    const handleTakeSID = (SID) => {
      setSocket_id(SID);
    };

    socket.on("connect", handleConnect);
    socket.on("take_SID", handleTakeSID);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("take_SID", handleTakeSID);
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const handleReceiveMsg = (msg) => {
      setAllMessages((prev) => [...prev, msg]);
    };

    const handleLoadOldMessages = (messages) => {
      setAllMessages(messages);
    };

    socket.on("receive-msg", handleReceiveMsg);
    socket.on("load-old-messages", handleLoadOldMessages);

    return () => {
      socket.off("receive-msg", handleReceiveMsg);
      socket.off("load-old-messages", handleLoadOldMessages);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket_id) return;

    socket.emit("join-room", chatUsers);
  }, [socket_id, socket]);

  const handleSendMsgs = () => {
    if (messages.trim() === "") return;

    let newMsg = {
      sender_id: user._id,
      receiver_id: id,
      text: messages,
      roomId: chatUsers.roomId,
    };

    socket.emit("send-msg", newMsg);
    setMessages("");
    // Do NOT update allMessages here; let the socket event handle it
  };

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

      <div className="">
        {allMessages.map((elem, i) => {
          return <li key={i}>{elem.content}</li>;
        })}
      </div>
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
          onClick={handleSendMsgs}
          className="px-4 py-2 bg-zinc-800 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
