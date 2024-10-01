const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
io.on("connection", socket => {
    socket.on("joinRoom", ({username, room}) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // this is for a single client
        socket.emit("message", formatMessage("Chat Bot", "Welcome to the chat."));
    
        // Broadcast when a user connects
        // this is for all the clients with the exception of the client who is connecting
        socket.broadcast.to(user.room).emit("message", formatMessage("Chat Bot", `The ${user.username} user has joined the chat.`)) ;

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        // this is for all the clients
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    // runs when a client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if(user) {
            io.to(user.room).emit("message", formatMessage("Chat Bot", `The ${user.username} user has left the chat`));
            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
        });
        }
    });

    // this is for all the clients
    // io.emit();
})

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on ${PORT}.`));