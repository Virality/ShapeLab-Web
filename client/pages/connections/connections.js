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

const sendBroadcastMessage = (action) => {
  if (action) {
    Materialize.toast(`broadcast: ${action}`, 4000, 'rounded');
    Meteor.call('connections.updateAll', action);
  } else {
    Materialize.toast('no message to send', 4000, 'rounded');
  }
};

Template.connections.onRendered(() => {
  $(document).ready(() => {
    $('select.broadcast-message').material_select();
  });
});

Template.connection.onRendered(() => {
  $(document).ready(() => {
    $('select.client-message').material_select();
  });
});

Template.connections.helpers({
  connections() {
    return Connections.find().fetch();
  }
});

Template.connections.events({
  'change select.broadcast-message': (event) => {
    const action = $(event.target).find('option:selected').val();
    sendBroadcastMessage(action);

    // TODO reset selection to the default option
    // $(event.target)[0].selectedIndex = 0;
  }
});

Template.connection.events({
  'click .btn[type="submit"]'   : (event) => {
    event.preventDefault();
    const clientID = $(event.target).data('id');
    const action = $(`#custom-message-${clientID}`).val();
    sendMessage(clientID, action);
  },
  'keyup input'                 : (event) => {
    if (event.keyCode === 13) {
      $(event.target).closest('.card-panel').find('.btn[type="submit"]').click();
    }
  },
  'change select.client-message': (event) => {
    const clientID = $(event.target).data('id');
    const action = $(event.target).find('option:selected').val();
    sendMessage(clientID, action);

    // TODO reset selection to the default option
    // $(event.target)[0].selectedIndex = 0;
  }
});
