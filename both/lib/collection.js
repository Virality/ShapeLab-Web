import { Mongo } from 'meteor/mongo';

const Connections = new Mongo.Collection('connections');

/*
Connections.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc, fieldNames, modifier) {
    return true;
  },
  remove(userId, doc) {
    return true;
  }
});
*/

export default Connections;
