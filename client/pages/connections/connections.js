import { Template } from 'meteor/templating';

import Connections from '/both/lib/collection';

/* globals Materialize:true */

Meteor.subscribe('connections', () => {
  Connections.find().fetch();
});

const sendMessage = (clientID, action) => {
  if (action) {
    Materialize.toast(`send: ${action}`, 4000, 'rounded');
    Connections.update({ _id: clientID }, { $push: { actions: action } });
  } else {
    Materialize.toast('no message to send', 4000, 'rounded');
  }
};

Template.connection.onRendered(() => {
  $(document).ready(() => {
    $('select').material_select();
  });
});

Template.connections.helpers({
  connections() {
    return Connections.find().fetch();
  }
});

Template.connection.events({
  'click .btn[type="submit"]': (event) => {
    event.preventDefault();
    const clientID = $(event.target).data('id');
    const action = $(`#custom-message-${clientID}`).val();
    sendMessage(clientID, action);
  },
  'keyup input': (event) => {
    if (event.keyCode === 13) {
      $(event.target).closest('.card-panel').find('.btn[type="submit"]').click();
    }
  },
  'change select': (event) => {
    const clientID = $(event.target).data('id');
    const action = $(event.target).find('option:selected').val();
    sendMessage(clientID, action);

    // TODO reset selection to the default option
    // $(event.target)[0].selectedIndex = 0;
  }
});
