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
      type   : 'websocket',
      actions: []
    });

    // console.log('connected to client with ID:', clientID);

    // listen to events from the Meteor collection to get
    // the messages from the browser client and redirect them to the Unity3D client
    Connections.find({ _id: clientID }).observe({
      changed(newDocument) {
        // get the ws-messages from the browser client on any update for this Unity3D client
        if (newDocument.actions.length) {
          // save the first action
          const action = newDocument.actions[0];

          // remove the first action from the collection
          Connections.update({
            _id: clientID
          }, { $pop: { actions: -1 } });

          ws.send(action);
        }
      },
      removed() {
        // give feedback when the DB-entry for the Unity3D client was removed
        console.log(`${clientID} removed from collection`);
      }
    });

    const clientDataPackage = {
      clientID
    };

    ws.send(JSON.stringify(clientDataPackage));
  }).run();

  // these are only the messages received from the Unity3D client
  ws.on('message', (message) => {
    const addToActions = (m) => {
      fiber(() => {
        Connections.update({
          _id: clientID
        }, { $push: { actions: m } });
      }).run();
    };

    switch (message) {
      case 'reset':
        ws.send(`received: ${message}`, (error) => {
          if (error) {
            console.log(error);
          }
        });
        addToActions(message);
        break;
      case 'nextUser':
        // feedback for client
        ws.send(`received: ${message}`, (error) => {
          if (error) {
            console.log(error);
          }
        });
        addToActions(message);
        break;
      case 'testrun':
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
        break;
      default:
        ws.send(`unknown message: ${message}`, (error) => {
          if (error) {
            console.log(`unknown message "${message}" could not be send\n`,
              'Error:', error);
          }
        });
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
});
