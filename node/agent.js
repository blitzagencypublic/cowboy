var store = require("./store"),
    SerialPort = require("serialport").SerialPort;
    //var serial = new serialPort("/dev/tty.usbserialA9007ku9" , { baudrate : 31250 });

var trackLength = 10000;

function Agent(socket) 
{
	var startTime = Date.now();
	var list      = null;
	var loops     = 0;
	
	console.log("Starting: " + startTime);
	setInterval(function()
	{
		startTime = Date.now();
		loops = loops + 1;
		queuePlayback();
		console.log("Starting: " + startTime);
		
	}, trackLength);
	
	socket.on('action', function(data)
	{
		onAction(data);
	});
	
	function queuePlayback()
	{
		var current = list;
		while(1)
		{
			if(current.next == null) break;
			
			setTimeout(function()
			{
				sendToBrowser(current);
				
			}, current.time);
			
			current = current.next;
		}
	}
	
	function onAction(data)
	{
		var now    = Date.now();
		var time   = (now - startTime);
		var object = { "x": data.x, "y":data.y, "next":null, "previous":null, "time": time }
		
		if(list == null)
		{
			list = object;
			console.log("first object");
		}
		else
		{
			var current = list;
			console.log("inserting new touch");
			if(current.next == null)
			{
				current.next    = object;
				object.previous = current;
			}
			else
			{
				while(1)
				{
					console.log(time + " : " + current.time);
				
					if(object.time < current.time)
					{
						var previous = current.previous;
						var next     = current.next;
					
						if(current.previous == null) // first item in the list
						{
							object.next      = current;
							current.previous = object;
							list             = object;
						}
						else
						{
							object.previous  = current.previous;
							object.next      = current;
							current.previous = object;
						}
						
						break;
					}
					else
					{
						if(current.next == null) // end of the line
						{
							current.next    = object;
							object.previous = current;
							break;
						}
						else
						{
							current = current.next;
						}
					}
				}
			}
		}
	}
	
	function sendToBrowser(item)
	{
		socket.emit("data", {"x":item.x, "y":item.y });
	}
	
	/*
	setInterval(function()
	{
		
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