import Connections from '/both/lib/collection';
import Fiber from 'fibers';

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 3004 });

wss.on('connection', function connection(ws) {
  
  Fiber(function () {
    console.log('Meteor code is executing');
    //=> Meteor code
    var con = Connections.insert({
      type: 'websocket'
    });

    console.log(con);
    ws.send(con);
  }).run();

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('Here you have it back (with <3 from Sebastian): ' + message);
  });

  ws.on('close', function close() {
    console.log('connection closed');
    // Connections.remove({_id: con.id})
  });

  ws.send('something');
});
