import { Template } from 'meteor/templating';

import Connections from '/both/lib/collection';

Meteor.subscribe('connections', () => {
  console.log(Connections.find().fetch())
});

Template.connections.helpers({
  connections() {
    return Connections.find().fetch();
  }
});
