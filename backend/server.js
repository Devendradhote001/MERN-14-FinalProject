require("dotenv").config();
const app = require("./src/app");
const socketIo = require("socket.io");
const http = require("http");
const cacheClient = require("./src/services/cache.services");
const connectDB = require("./src/config/db/db");
const server = http.createServer(app);
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

cacheClient.on("connect", () => {
  console.log("Redis connected successfully");
});

cacheClient.on("error", (error) => {
  console.log("Error connecting redis->", error);
});

const onlineUsers = [];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.emit("take_SID", socket.id);

  socket.on("join-room", (chatUsers) => {
    socket.join(chatUsers.roomId);
    if (chatUsers.socket_id) {
      onlineUsers.push(chatUsers.socket_id);
    }
    console.log("for my tracking purpose", onlineUsers);
    console.log(" user join with room id", chatUsers.roomId);
  });

  socket.on("send-msg", (msg) => {
    console.log("incoming-msg", msg);

    if (onlineUsers.length === 2) {
      io.to(msg.roomId).emit("receive-msg", msg);
    }
  });

  socket.on("chat", (msg) => {
    console.log("msg received from client ->", msg);
    socket.emit("chat", "Badhiya hai bhai");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(3000, () => {
  console.log("server is running on port 3000");
});
