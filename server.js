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

let game = {
  player1: null,
  player2: null,
};

io.on("connection", (socket) => {
  socket.on("join_conversation", (id_group) => {
    socket.join(id_group);
    console.log(`L'utilisateur ${socket.id} a rejoint le groupe : ${id_group}`);
  });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA");
    //This will send a message to a specific room ID
    socket.to(data.id_group).emit("receive_msg", data);
    console.log(
      "Voici les utlisateur dans le groupe : ",
      io.sockets.adapter.rooms.get(data.id_group)
    );
    console.log("Message envoyé au groupe : ", data.id_group);
  });

  // gestion de la connexion d'un utilisateur a une game de battaille navale

  socket.on("join_game", (id_game) => {
    socket.join(id_game);
    console.log(`L'utilisateur ${socket.id} a rejoint la game : ${id_game}`);
  });

  socket.on("join_game", (id_game) => {
    socket.join(id_game);
    console.log(`L'utilisateur ${socket.id} a rejoint la game : ${id_game}`);

    if (!game.player1) {
      game.player1 = socket.id;
    } else if (!game.player2) {
      game.player2 = socket.id;
      io.to(game.player1).emit("player2_joined");
    } else {
      console.log("La partie est pleine");
      socket.emit("game_full");
    }
  });

  socket.on("disconnect", () => {
    console.log("utilisateur déconnecté", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Le serveur est en cours d'écoute sur le port ${PORT}`);
});
