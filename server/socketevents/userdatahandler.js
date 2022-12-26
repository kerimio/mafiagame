const userDataHandler = (io, socket) => {
  socket.on("user:getroomdata", callback => {
    // if user in a room, return the room, roompass, and nickname
    const client = process.clients.get(socket.userid);
    if (client.room && process.rooms.has(client.room))
      return callback(
        client.room,
        process.rooms.get(client.room).password,
        client.nickname,
        client.userRole,
        process.rooms.get(client.room).messages,
        console.log(client)
      );
    return callback();
  });
};

export {userDataHandler};
