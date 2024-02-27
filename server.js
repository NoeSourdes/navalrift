const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("utilisateur connecté :", socket.id);
  socket.on("join_conversation", (id_group) => {
    socket.join(id_group);
    console.log("Lutilisateur a rejoit le groupe : ", id_group);
  });

  socket.on("send_msg", (data) => {
    console.log("message : ", data);
    socket.to(data.id_group).emit("receive_msg", data);
    console.log("message envoyé au groupe : ", data.id_group);
  });

  socket.on("disconnect", () => {
    console.log("utilisateur déconnecté", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Le serveur est en cours d'écoute sur le port ${PORT}`);
});
