const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://navalrift.vercel.app"],
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
  });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA");
    socket.to(data.id_group).emit("receive_msg", data);
    socket.to(data.id_group).emit("notification", {
      message:
        "Nouveau message reçu de " +
        data.name_user +
        " dans le groupe " +
        data.name_group,
    });
  });

  // gestion de la connexion a une partie de jeu

  socket.on("join_game", (id_game) => {
    socket.join(id_game);
    console.log(`L'utilisateur ${socket.id} a rejoint la game : ${id_game}`);

    if (!game.player1) {
      game.player1 = socket.id;
    } else if (!game.player2) {
      game.player2 = socket.id;
      // Emit event to the room that the game can start
      io.to(id_game).emit("game_can_start", {
        player1: game.player1,
        player2: game.player2,
      });
    } else {
      console.log("La partie est pleine");
      socket.emit("game_full");
    }
  });

  socket.on("disconnect", () => {
    console.log("utilisateur déconnecté", socket.id);
    // Reset game state when a player disconnects
    if (socket.id === game.player1 || socket.id === game.player2) {
      game = {
        player1: null,
        player2: null,
      };
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Le serveur est en cours d'écoute sur le port ${PORT}`);
});
