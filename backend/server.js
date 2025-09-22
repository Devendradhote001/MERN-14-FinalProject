const express = require("express");
const socketIo = require("socket.io");

const app = express();

const http = require("http");
const path = require("path");
const server = http.createServer(app);

const io = socketIo(server);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

let data = ["rahul", "piyush", "sagar"];

app.get("/", (req, res) => {
  res.render("index.ejs", { greet: data });
});

const users = {};

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
