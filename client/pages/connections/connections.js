import { Template } from 'meteor/templating';

import Connections from '/both/lib/collection';

/* globals Materialize:true */

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
    if (action) {
      Materialize.toast(`send: ${action}`, 4000, 'rounded');
      Connections.update({ _id: clientID }, { $push: { actions: action } });
    } else {
      Materialize.toast('no message to send', 4000, 'rounded');
    }
  },
  'keyup input': (event) => {
    if (event.keyCode === 13) {
      $(event.target).parent().parent().find('.btn').click();
    }
  }
});
