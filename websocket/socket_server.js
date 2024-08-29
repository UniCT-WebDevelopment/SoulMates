const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server (httpServer,{
    cors:{
        origin: "*",
        methods: ["GET", "POST",]
    }
});


let users = {};

io.on("connection", async(socket) => {

    socket.on('register', (userId) => {
        users[userId] = socket.id;
        console.log(`User con ID ${userId} registered with socket ID ${socket.id}`);
    });

    socket.on('sendMessage', ({ senderId, receiverId, message}) => {
        const receiverSocketId = users[receiverId];
        console.log("socket id ricevente:" + receiverSocketId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('receiveMessage', {
                senderId,
                message,
            })
            
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const [userId, socketId] of Object.entries(users)) {
            if (socketId === socket.id) {
              delete users[userId];
              break;
            }
        }
    });
});

httpServer.listen(5001, () => {
    console.log("Server in ascolto sulla porta 5001");
})