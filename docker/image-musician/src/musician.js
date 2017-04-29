/*  Get in a variable the protocol's info */ 
var protocol = require('./protocol');

/* Constants */
const ARGUMENT = 2;
const INTERVAL = 1000;

/* All the instruments */
const INSTRUMENTS = {
	piano:'ti-ta-ti',
	trumpet:'pouet',
	flute:'trulu',
	violin:'gzi-gzi',
	drum:'boum-boum'
};


/* Id of a musician */
var uuid = require('uuid');

/* Variable for the connexion */
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');;

/* Get the instrument from the command's line */
var instrument = process.argv[ARGUMENT];
if(INSTRUMENTS[instrument] === undefined){
	process.on('exit', function(){
		console.log('Seems like the instrument is unknow... Quitting the application...');
		process.exit(1);
	});
}

function Musician() {
	this.uuid = uuid.v4(),
	this.instru = instrument,
	this.activeSince = new Date()
}

/* Variable that will stock the musician's info in a json way */
Musician.prototype.update = function() {
	var musicianToJson =  {
	'uuid':this.uuid,
	'sound':INSTRUMENTS[this.instru],
	'activeSince':this.activeSince
	};

	var json = JSON.stringify(musicianToJson);
	socket.send(json, protocol.PORT, protocol.MULTICAST_ADDRESS, function() {
		console.log('Sending ' + json);
	});
}


/* Main function
 * Will send musician's info */


var newMusician = new Musician();
/* Do the job every second */
setInterval(newMusician.update.bind(newMusician), INTERVAL);