var store = require("./store"),
    SerialPort = require("serialport").SerialPort;
    //var serial = new serialPort("/dev/tty.usbserialA9007ku9" , { baudrate : 31250 });

function Agent(socket) 
{
	var baseLength  = 2000; 
	var trackLength = baseLength;
	
	socket.on('action', function(data)
	{
		onAction(data);
	});
	
	function onAction(data)
	{
		if(store.getLength() > 2)
		{
			console.log(trackLength);
		}
		
		store.write(data);
	}
	
	/*
	setInterval(function()
	{
		socket.emit("data", {"x": 100, "y": 100});
	}, 2000);
	*/
	
}; 

/*
Agent.prototype.onAction = function(data)
{
	
	//console.log("hello world");
}
*/
module.exports = Agent;