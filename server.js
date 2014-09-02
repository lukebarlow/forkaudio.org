var express = require('express'),
    app = express(),
    rockpool = require('../rockpool'),
    wemix = require('../wemix'),
    prong = require('../prong'),
    //fours = require('../fours')
    port = 8081;

app.use('/rockpool', rockpool);
//app.use('/fours', fours);
app.use('/prong', prong);
app.use('/wemix', wemix);
app.use(express.static(__dirname + '/public'));
var server = app.listen(port);

// the socket stuff
var io = require('socket.io').listen(server, { log: false });
rockpool.initSocket(io);
wemix.initSocket(io);

console.log('Fork website running at localhost:' + port);