const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = 3001;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(' User Connection ', socket.id);

  socket.on("join_room", (data) => {
    console.log(`user id joined:  ${socket.id}, room name : ${data}`)
    socket.join(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })
});

server.listen(PORT, () => {
  console.log(`Server Running in port, ${PORT}`);
});