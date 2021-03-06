var express  = require('express');
var app = express();
var session  = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var braintree = require('braintree');
var nodemailer = require('nodemailer');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const uuidv1 = require('uuid/v1');
const path = require('path');

var $credentials = {
    "accessKeyId": "AKIAJCS6PAKOBGBF2F4Q",
    "secretAccessKey": "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",
    "region": "us-east-2"
}
var dynamodb = require('@awspilot/dynamodb')($credentials);

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

//module.exports = app;

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(session({
	secret: 'bitcoin',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/braintree')(app, braintree);
require('./routes/nodemailer')(app, nodemailer);
require('./routes/transaction')(app, dynamodb, uuidv1);
require('./routes/passport')(app, passport, GoogleStrategy, dynamodb, uuidv1);

if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: '/public/src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'public/src/index.html'));
    });
} else {
    //app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'public/src/index.html'));
    });
}

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
