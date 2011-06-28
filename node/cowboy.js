var SerialPort = require("serialport").SerialPort,
    io         = require('socket.io').listen(7331);

//var serial = new serialPort("/dev/tty.usbserialA9007ku9" , { baudrate : 31250 });