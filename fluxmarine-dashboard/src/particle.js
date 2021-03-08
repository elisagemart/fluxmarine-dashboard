import Particle from 'particle-api-js';

var particleDefaults = {
	baseUrl: 'https://api.particle.io',
	clientSecret: process.env.REACT_APP_PARTICLE_SECRET,
	clientId: process.env.REACT_APP_PARTICLE_CLIENT_ID,
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