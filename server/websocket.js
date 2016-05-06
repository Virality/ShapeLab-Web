import Connections from '/both/lib/collection';
// import fiber from 'fibers';

/* globals fiber:true */
fiber = Npm.require('fibers');

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  let clientID;

  fiber(() => {
    clientID = Connections.insert({
      type         : 'websocket',
      clientAddress: '123.TODO',
      httpHeaders  : { host: 'TODO.de' }
    });
    console.log('connected to client with ID:', clientID);
  }).run();

  ws.on('message', (message) => {
    console.log('received: %s', message);
    if (message === 'testrun') {
      ws.send('resetall');
      ws.send('ResetAll');
      ws.send('RESETALL');
      ws.send('resettools');
      ws.send('resetscreenshots');
      ws.send('next');
      ws.send('NextUser');
      ws.send('nextuser');
      ws.send('screenshot');
      ws.send('takescreenshot');
    } else {
      ws.send(`Here you have it back (with <3 from Sebastian): ${message}`);
    }
  });

  ws.on('close', () => {
    console.log('connection with', clientID, 'closed');

    fiber(() => {
      Connections.remove({
        _id: clientID
      });
    }).run();
  });

  // ws.send('terminate');
});
