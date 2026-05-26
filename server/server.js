const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const followRoutes =
require("./routes/followRoutes");



require("dotenv").config();

const http = require("http");

const { Server } =
require("socket.io");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const server =
http.createServer(app);

const io =
new Server(server,{

  cors:{
    origin:"*",
    methods:["GET","POST"],
  },

});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/follow", followRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Social Media Backend Running");
});

const PORT = process.env.PORT || 5000;

io.on("connection",(socket)=>{

  console.log("User Connected");

  // SEND MESSAGE

  socket.on("send_message",(data)=>{

    io.emit("receive_message",data);

  });

  socket.on("disconnect",()=>{

    console.log("User Disconnected");

  });

});

server.listen(PORT,()=>{

  console.log(
    `Server running on ${PORT}`
  );

});