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

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("chat", (msg) => {
    console.log("msg received from client ->", msg);
    socket.emit("chat", "Badhiya hai bhai");
  });

  socket.on("register", (data) => {
    console.log("id of client->", data);
  });
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
