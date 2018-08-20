var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cors = require('cors');
var is = require('is_js');

const port = process.env.PORT || 8181;

// Set io to use on controllers with req.app.get
app.io = io;

server.listen(port);

/**
 * CORS
 */
app.use(cors())

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
 * emit
 */
app.post('/', function (req, res) {
  if (is.empty(req.body.event) || is.undefined(req.body.event)) {
    return res.status(400).json({
      error: {
        message: 'The event parameter can not be empty.'
      }
    });
  }

  if (!is.json(req.body.data)) {
    return res.status(400).json({
      error: {
        message: 'The data parameter must be an object.'
      }
    });
  }

  req.app.io.sockets.emit(req.body.event, req.body);
  res.json(req.body);
});