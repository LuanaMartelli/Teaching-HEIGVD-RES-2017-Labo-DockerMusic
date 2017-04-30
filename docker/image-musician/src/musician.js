
var protocol = require('./protocol');


const ARGUMENT = 2;
const INTERVAL = 1000;

var instruments = new Map();
instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");


var dgram = require('dgram');

var uuid = require('uuid');

var socket = dgram.createSocket('udp4');
socket.bind(protocol.PORT_MUSICIANS);

function Musician(i) {
    this.uuid = uuid.v4();
    this.instrument = i;
    this.sound = instruments.get(arg);
    this.activeSince = new Date();

    Musician.prototype.update = function() {

        var toJson = {
            'uuid' : this.uuid,
            'instrument' : this.instrument,
            'sound' : this.sound,
            'activeSince' : this.activeSince
        };
        var json = JSON.stringify(toJson);
        var message = new Buffer(json);
        socket.send(message, 0, message.length, protocol.PORT_MUSICIANS, protocol.MULTICAST_ADDRESS, function() {
            console.log("Now playing : " + json);
        });
    }
    setInterval(this.update.bind(this), INTERVAL);
}



var arg = process.argv[ARGUMENT];
if (!instruments.has(arg)) {
    process.on('exit', function(){
        console.log('Seems like the instrument is unknow... Quitting the application...');
        process.exit(1);
    });
}

var musician = new Musician(arg);
