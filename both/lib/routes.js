import { Router } from 'meteor/iron:router';
import { AccountsTemplates } from 'meteor/useraccounts:core';

Router.configure({
  layoutTemplate: 'mainLayout',
  yieldTemplates: {
    header: { to: 'header' },
    footer: { to: 'footer' },
  }
});

Router.route('/', {
  name          : 'home',
  template      : 'home',
  yieldTemplates: {
    header: { to: 'header' },
    footer: { to: 'footer' },
  }
});

Router.route('/connections', {
  name          : 'connections',
  template      : 'connections',
  yieldTemplates: {
    header: { to: 'header' },
    footer: { to: 'footer' },
  }
});

Router.route('/sign-out', {
  name: 'sign-out',
  onBeforeAction() {
    AccountsTemplates.logout();
    Router.go('/');
  }
});

Router.route('/(.*)', function () {
  this.redirect('/');
});

// ensure a signed in user for the user related pages
Router.plugin('ensureSignedIn', {
  only: [
    'connections'
  ]
});
