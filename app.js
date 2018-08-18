var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var enrouten = require('express-enrouten');

const port = process.env.PORT || 8181;

// Set io to use on controllers with req.app.get
app.io = io;

server.listen(port);

/**
 * body-parser
 */
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/**
 * Validate authorization header
 */
app.use(function(req, res, next) {
  if (req.headers.authorization !== process.env.ACCESS_TOKEN) {
    return res.status(401).json({
      error: {
        message: 'Unauthorized'
      }
    });
  }

  next();
});

/**
 * Controllers
 */
app.use(enrouten({
  directory: 'controllers'
}));