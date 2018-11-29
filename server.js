function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', (data) => {
			socket.emit('welcomeMessage', `Welcome ${data.username} !!`);
			data.channels.forEach(channel => {
				socket.join(channel.trim());
				socket.emit('addedToChannel', { channel: `${channel.trim()}` });
			});
		});

		socket.on('message', (data) => {
			socket.broadcast.to(data.channel).emit('newMessage', data);
		});

		socket.on('joinChannel', (data) => {
			socket.join(data.channel);
			socket.emit('addedToChannel', { channel: `${data.channel}` });
		});

		socket.on('leaveChannel', (data) => {
			socket.leave(data.channel);
			socket.emit('removedFromChannel', { channel: `${data.channel}` });
		});
	});

}

module.exports = bootstrapSocketServer;
