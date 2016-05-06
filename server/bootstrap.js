import Connections from '/both/lib/collection';

Meteor.startup(() => {
  // clear all old connection entries on startup
  Connections.remove({});
});
