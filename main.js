const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');

let app = express();

app.set('port', (process.env.PORT || config.get('port')));

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use('/static', express.static('public'));
app.use(require('replacer'));

app.use('/api/', require('router'));

app.use('/', (req, res, next) => {
    next(new Error('no method'));
});

app.use(function (err, req, res, next) {
    console.error(err);

    res.json({status: 400, message: err.message});
});

process.on('uncaughtException', function (err) {
    console.error('uncaughtException: ', err.message);
    console.error(err.stack);
});

app.listen(app.get('port'), function () {
    console.log('AuthSystem started on port', app.get('port'));
});