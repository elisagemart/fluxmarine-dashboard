import Particle from 'particle-api-js';

var particleDefaults = {
	baseUrl: 'https://api.particle.io',
	clientSecret: 'c39838c49fda47547835a66a8765cc08470dedc9',
	clientId: 'fluxmarine-dashboard-5691',
	tokenDuration: 7776000 // 90 days
};

var particle = new Particle(particleDefaults);

//data stored in local browser to handle credentials for this session
//TODO: cookies?
var particleSettings ={
	userToken: '',
	username: '',
	password: ''
};


export {particle, particleSettings};