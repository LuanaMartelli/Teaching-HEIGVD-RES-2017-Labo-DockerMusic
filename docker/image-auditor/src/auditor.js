var protocol = require('./protocol');


var sounds = new Map();
sounds.set("ti-ta-ti", "piano");
sounds.set("pouet", "trumpet");
sounds.set("trulu", "flute");
sounds.set("gzi-gzi", "violin");
sounds.set("boum-boum", "drum");

var maxWaitSeconds = 5;


var dgram = require('dgram');


var net = require('net');


/*
 * Let's create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by musicians and containing sounds
 */
var socket = dgram.createSocket('udp4');
socket.bind(protocol.PORT_MUSICIANS, function() {
    console.log("An auditor has joined the concerto !");
    socket.addMembership(protocol.MULTICAST_ADDRESS);
});

var alwaysthere = [];
var soundsPlaying = [];
var musicians = new Map();


socket.on('message', function(msg, source) {
    console.log("An auditor has joined the concerto !");
    var data = JSON.parse(msg);
    var soundAlreadyExists = false;

    if (!musicians.has(data.uuid)) {
        musicians.set(data.uuid, {
            'uuid' : data.uuid,
            'instrument' : data.instrument,
            'activeSince' : new Date()
        });
    } else {
        musicians.get(data.uuid).activeSince = new Date();
    }

});

var server = net.createServer(function (s) {   
    console.log("Server from auditor");

    var now = new Date();
    alwaysthere = [];
    musicians.forEach(function (v, k) {
        if (now - v.activeSince <= 5000) {
            alwaysthere.push(v);
        }
    })

    var toSend = JSON.stringify(alwaysthere);
    s.write(toSend);
    s.end();


});

server.listen(protocol.PORT, '0.0.0.0');
