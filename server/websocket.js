import Connections from '/both/lib/collection';


var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 3004 });

wss.on('connection', function connection(ws) {
  /*
   Connections.insert({
   type: 'websocket'
   });
*/

  // console.log(ws);
  // console.log(ws);
  // console.log(ws.connection);

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


// var WebSocketServer = require('websocket').server;


