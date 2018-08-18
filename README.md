# socket.control.fitness

Server to manage WebSocket in Control Fitness

## Setup

    $ heroku config:set ACCESS_TOKEN="$(openssl rand -hex 32)"

## Basic HTML

    <script src="http://socket.control.fitness/socket.io/socket.io.js"></script>
    <script>
      var socket = io.connect('http://socket.control.fitness');
      socket.on('account-create', function (data) {
        if (data.tenant === 'demo') {
          console.log(data);
        }
      });
    </script>

## Account Create Done

    $ curl --data "tenant=demo" http://socket.control.fitness/account/create/done
