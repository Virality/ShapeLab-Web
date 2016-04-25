import { Meteor } from 'meteor/meteor';
import Connections from '/both/lib/collection';

Meteor.publish('connections', () => {
  return Connections.find({});
});

Meteor.onConnection((connection) => {
  Connections.insert({
    _id: connection.id,
    clientAddress: connection.clientAddress,
    httpHeaders: connection.httpHeaders
  });

  connection.onClose(() => {
    Connections.remove({_id: connection.id})
  })
});