
const serialport = require("serialport");
const SerialPort = serialport.SerialPort;
const portName = process.argv[2];


const myPort = new serialport(portName,{
    baudRate:9600,
    parser: new serialport.parsers.Readline("\r\n")
})

myPort.on('open',onOpen);
myPort.on('data',onData);

function onOpen(){
    console.log("Open Connection");
}

function onData(data){
    console.log("on Data " + data);
}