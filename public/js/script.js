function sendMessage(event, socket) {
	event.preventDefault();
	username = document.getElementById('username').value;
	channel = document.getElementById('channel').value;
	message = document.getElementById('message').value;
	chatContainer = document.getElementById('chatContainer');
	exitingText = chatContainer.innerHTML;
	chatContainer.innerHTML = `
	<div class="col-12">
		<div class="card sent-message">
			<div class="card-body">
				<p class="card-text">Me : ${message}</p>
			</div>
		</div>
	</div>
	` + exitingText;
	socket.emit('message', { username, channel, message });
}

function joinChannel(event, socket) {
	channel = document.getElementById('newchannel').value;
	socket.emit('joinChannel', { channel });
}

function leaveChannel(event, socket) {
	channel = document.getElementById('newchannel').value;
	socket.emit('leaveChannel', { channel });
}

function onWelcomeMessageReceived(msg) {
	document.getElementById('chatContainer').innerHTML = `
	<div class="col-12">
		<div class="card received-message">
			<div class="card-body">
				<p class="card-text">System : ${msg}</p>
			</div>
		</div>
	</div>
	`;
}

function onNewMessageReceived(data) {
	chatContainer = document.getElementById('chatContainer');
	exitingText = chatContainer.innerHTML;
	chatContainer.innerHTML = `
	<div class="col-12">
		<div class="card received-message">
			<div class="card-body">
				<p class="card-text">${data.username} : ${data.message}</p>
			</div>
		</div>
	</div>
	` + exitingText;
}

function onAddedToNewChannelReceived(data) {
	document.getElementById('alertContainer').innerHTML = `
	<div class="alert alert-success alert-dismissible fade show" role="alert">
		You are added to <strong>${data.channel}</strong> successfully!
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	`;
	document.getElementById('channelsList').innerHTML += `
	<option>${data.channel}</option>
	`;
}

function onRemovedFromChannelReceived(data) {
	document.getElementById('alertContainer').innerHTML = `
	<div class="alert alert-success alert-dismissible fade show" role="alert">
		You are removed from <strong>${data.channel}</strong> successfully!
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	`;
	channelsList = document.getElementById('channelsList');
	listOfChannels = channelsList.getElementsByTagName('option');
	for (let i = 0; i < listOfChannels.length; i++) {
		currentChannel = listOfChannels[i].innerHTML;
		if (currentChannel === data.channel) {
			channelsList.removeChild(listOfChannels[i]);
		}
	}

}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

