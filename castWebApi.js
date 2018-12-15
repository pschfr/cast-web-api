const Express = require('express');
const configuration = require("./lib/config/config.js");

configuration.init(process.argv.slice(2));

const assistant = require("./lib/assistant");
const device = require("./lib/device");
const config = require("./lib/config");
const deviceId = require("./lib/device/id");

startApi();

function startApi() {
	console.log('cast-web-api v'+configuration.thisVersion);
	createWebServer();
}

//WEBSERVER
function createWebServer() {
	const webserver = Express();

	webserver.use(assistant);
	webserver.use(device);
	webserver.use(deviceId);
	webserver.use(config);

	webserver.use('/assistant/setup/ui', Express.static('./lib/assistant/setup/ui'));

	webserver.get('/', function (req, res) {
		res.json({castWebApi: `v${configuration.thisVersion}`});
	});

	webserver.listen(configuration.port, () => {
		console.log(`cast-web-api running at http://${configuration.hostname}:${configuration.port}`);
	});
}