var SerialPort = require("serialport").SerialPort,
    io         = require('socket.io').listen(7331);

	
	io.sockets.on('connection', function (socket) 
	{
		//socket.emit('news', { hello: 'world' });
	
		socket.on('action', function (data) 
		{
	    	
		});
	});
	
//var serial = new serialPort("/dev/tty.usbserialA9007ku9" , { baudrate : 31250 });