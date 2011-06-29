var io         = require('socket.io').listen(7331),
    Agent      = require('./agent');
	
var currentAgent = null;	
io.sockets.on('connection', function (socket) 
{
	currentAgent = Agent(socket);
});
	
