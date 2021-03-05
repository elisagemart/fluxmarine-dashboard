import Particle from 'particle-api-js';

var particleDefaults = {
	baseUrl: 'https://api.particle.io',
	clientSecret: 'c39838c49fda47547835a66a8765cc08470dedc9',
	clientId: 'fluxmarine-dashboard-5691',
	tokenDuration: 7776000 // 90 days
};

var particle = new Particle(particleDefaults);


export default particle;