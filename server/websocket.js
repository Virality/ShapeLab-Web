import Connections from '/both/lib/collection';
import Fiber from 'fibers';

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 3004 });

wss.on('connection', function connection(ws) {
  let clientID;

  Fiber(function () {
    clientID = Connections.insert({
      type: 'websocket',
      clientAddress: '123.TODO',
      httpHeaders: {host: 'TODO.de'}
    });
    console.log('connected to client with ID:', clientID);
  }).run();

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('Here you have it back (with <3 from Sebastian): ' + message);
  });

  ws.on('close', function close() {
    console.log('connection with', clientID ,'closed');

    Fiber(function () {
      Connections.remove({
        _id: clientID
      });
    }).run();
  });

  // ws.send('terminate');
});
