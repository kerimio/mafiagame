const roomLeave = (io, socket, callback) => {
  const client = process.clients.get(socket.userid, socket.userRole);
  if (!client || !client.room || !process.rooms.has(client.room)) return;
  socket.leave(client.room);
  client.room = null;
  client.nickname = null;
  client.userRole = null;
  return callback();
};

const leaveRoomHandler = (io, socket) => {
  socket.on("room:leave", callback => roomLeave(io, socket, callback));
};

export {roomLeave, leaveRoomHandler};
