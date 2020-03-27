
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

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
    console.log('Open Connection');
    myPort.write(' Anup');
}

function onData(data){
    console.log('on Data ' + data);
}

fs.readFile('index.html',(err,html) =>{
    if(err){
        throw err;
    }
    const server = http.createServer((req,res) =>{
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end('');
    });
    
    server.listen(port,hostname, () => {
        console.log('Server started on port ' + port);
    });
});

