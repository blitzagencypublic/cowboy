var SerialPort = require("serialport").SerialPort,
    io        = require('socket.io').listen(8080);

var serial = new serialPort("/dev/tty.usbmodem1d11" , { baudrate : 9600 });