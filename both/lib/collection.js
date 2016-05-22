import { Mongo } from 'meteor/mongo';

const Connections = new Mongo.Collection('connections');

Connections.allow({
  update(userId, doc, fieldNames, modifier) {
    return true;
  }
});

export default Connections;
