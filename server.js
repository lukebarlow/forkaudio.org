var express = require('express'),
    app = express(),
    rockpool = require('../rockpool'),
    prong = require('../prong'),
    fours = require('../fours')
    port = 8082;

app.use('/rockpool', rockpool);
app.use('/fours', fours);
app.use('/prong', prong);
app.use(express.static(__dirname + '/public'));
var server = app.listen(port);
rockpool.initSocket(server);
console.log('Fork website running at localhost:' + port);