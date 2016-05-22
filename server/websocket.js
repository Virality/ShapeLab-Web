import Connections from '/both/lib/collection';
// import fiber from 'fibers';

/* globals fiber:true */
fiber = Npm.require('fibers');

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  let clientID;
  const actionRetryTimer = 1000;
  // const actionTimeout = actionRetryTimer * 60;

  const executeAction = (action) => {
    ws.send(action, (error) => {
      if (error) {
        // console.log('Action could not be send\n', 'Error:', error);
        setTimeout(() => {
          executeAction(action);
        }, actionRetryTimer); // try again after a certain period
      } else {
        // remove the oldest action from the collection
        fiber(() => {
          Connections.update({
            _id: clientID
          }, { $pop: { actions: -1 } });
        }).run();
      }
    });
  };

  const addToErrorLog = (msg) => {
    fiber(() => {
      Connections.update({
        _id: clientID
      }, { $push: { errors: { createdAt: new Date().valueOf(), msg } } });
    }).run();
  };

  // init collection entry after a new Unity client connects
  fiber(() => {
    clientID = Connections.insert({
      type   : 'websocket',
      actions: [],
      errors : []
    });

    // listen to events from the Meteor collection to get
    // the messages from the browser client and redirect them to the Unity3D client
    Connections.find({ _id: clientID }).observe({
      changed(newDocument) {
        // get the ws-messages from the browser client on any update for this Unity3D client
        if (newDocument.actions.length) {
          // save the oldest action
          const action = newDocument.actions[0];

          executeAction(action);
        }
      },
      removed() {
        // give feedback when the DB-entry for the Unity3D client was removed
        console.log(`${clientID} removed from collection`);
      }
    });

    // send the ID of the Unity client back
    const clientDataPackage = {
      clientID
    };

    ws.send(JSON.stringify(clientDataPackage));
  }).run();

  // these are only the messages received from the Unity3D client
  ws.on('message', (message) => {
    switch (message) {
      case 'error':
        addToErrorLog(message);
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
    // console.log('connection with', clientID, 'closed');

    fiber(() => {
      Connections.remove({
        _id: clientID
      });
    }).run();
  });
});
