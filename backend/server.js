require("dotenv").config();
const app = require("./src/app");
const socketIo = require("socket.io");
const cookieParser = require("cookie-parser");
const http = require("http");
const cacheClient = require("./src/services/cache.services");
const server = http.createServer(app);

app.use(cookieParser());

const io = socketIo(server);

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
