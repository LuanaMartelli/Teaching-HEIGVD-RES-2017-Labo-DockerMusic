/*  Get in a variable the protocol's info */ 
var protocol = require('./protocol');

/* Constants */
const INTERVAL = 5000;

/* All the sounds */
const SOUNDS = {
    'ti-ta-ti':'piano',
    'pouet':'trumpet',
    'trulu':'flute',
    'gzi-gzi':'violin',
    'boum-boum':'drum'
};

/* Variable for the connexion */
var dgram = require('dgram');
var net = require('net');
var socket = dgram.createSocket('udp4');

socket.bind(protocol.PORT, function() {
    console.log("An auditor has joined the concerto !");
    socket.addMembership(protocol.MULTICAST_ADDRESS);
});

var currentlyPlaying = new Map();

socket.on('message', function(msg, src) {
    console.log("Message " + msg + " from port " + src.port)

    var data = JSON.parse(msg);
    var soundAlreadyExists = false;

    // we check every sound playing to update the array
    if (!currentlyPlaying.has(data.uuid)) {
            currentlyPlaying.set(data.uuid, {
                'uuid':data.uuid,
                'instrument':data.instrument,
                'activeSince':data.activeSince
            });
    console.log("New sound recieved : " + SOUNDS[data.INSTRUMENTS[data.instrument]]);
    } else {
        currentlyPlaying.get(data.uuid).activeSince = new Date();
    }    
});

var server = net.createServer(function (s) {

    var now = new Date();
    musicians = [];
    currentlyPlaying.forEach(function (valeur, clef){
    if(now - valeur.activeSince <= INTERVAL){
        musicians.push(valeur);
    }
   var newLine = JSON.stringify(musicians);
    s.write(newLine + '\n');
    s.end();
    });

});


server.listen(protocol.PORT);

