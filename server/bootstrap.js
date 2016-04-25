import Connections from '/both/lib/collection';

Meteor.startup(function () {
  // clear all old connection entries on startup
  Connections.remove({});
});
