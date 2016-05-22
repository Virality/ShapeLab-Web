import { Template } from 'meteor/templating';

import Connections from '/both/lib/collection';

Meteor.subscribe('connections', () => {
  Connections.find().fetch();
});

Template.connections.helpers({
  connections() {
    return Connections.find().fetch();
  }
});

Template.connection.events({
  'click .btn': (event) => {
    event.preventDefault();
    const clientID = $(event.target).data('id');
    const action = $(`#custom-message-${clientID}`).val();
    console.log(action);
    Connections.update({ _id: clientID }, { $push: { actions: action } });
  }
});
