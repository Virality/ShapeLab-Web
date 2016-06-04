import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Connections = new Mongo.Collection('connections');

Connections.allow({
  update(/* userId, doc, fieldNames, modifier */) {
    return true;
  }
});

Meteor.methods({
  'connections.updateAll'(message) {
    check(message, String);

    /* TODO allow only for logged in users
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    */

    Connections.update({}, { $push: { actions: message } }, { multi: true });
  }
});

export default Connections;
