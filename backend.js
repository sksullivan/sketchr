// MODULES ------------------------------------

express = require('express');
colors = require('colors');

// SETUP ------------------------------------

app = express();

server = require('http').createServer(app);
io = require('socket.io').listen(server);

logger = function(req, res, next) {
    console.log("   info (backend) - ".cyan+req.method+" "+req.url);
    next();
}

app.configure(function () {
	app.set('views', __dirname + '/client/views');
	app.set('view engine', 'jade');
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(logger);
	app.use(app.router);
	app.use(express.static(__dirname + '/client'));
	app.use(function (req,res) {
		res.send('404 - Not found');
		console.log('   error (backend) - '.red+'client requested an undefined route :(');
	});
});

io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

app.configure('development', function () {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

onlineUsers = [];

// PAGE ROUTES ------------------------------------

app.get('/', function (req,res) {
	res.render("index", {
		title: 'index'
	});
});

server.listen(process.env.PORT || 5000);