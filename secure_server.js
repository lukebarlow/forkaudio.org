var express = require('express'),
    app = express(),
    rockpool = require('../rockpool'),
    wemix = require('../wemix'),
    prong = require('../prong'),
    //fours = require('../fours')
    port = 8081,
    http = require('http'),
    https = require('https'),
    fs = require('fs');

var privateKey = fs.readFileSync('/home/security/ssl.key');
var certificate = fs.readFileSync('/home/security/ssl.cert');
var credentials = {key: privateKey, cert: certificate};

app.use('/rockpool', rockpool);
//app.use('/fours', fours);
app.use('/prong', prong);
app.use('/wemix', wemix);
app.use(express.static(__dirname + '/public'));

http.globalAgent.maxSockets = 100;
http.Agent.maxSockets = 100;

https.globalAgent.maxSockets = 100;
https.Agent.maxSockets = 100;

httpServer = http.createServer(app);
httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
httpsServer.listen(443);

// the socket stuff
var sio = require('socket.io').listen(httpsServer, { log: false });
sio.set('transports', ['xhr-polling']);
rockpool.initSocket(sio);
wemix.initSocket(sio);

var io = require('socket.io').listen(httpServer, { log: false });
io.set('transports', ['xhr-polling']);
rockpool.initSocket(io);
wemix.initSocket(io);

console.log('Fork website running at localhost:' + port);
