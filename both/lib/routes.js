import { Router } from 'meteor/iron:router';

Router.configure({
  layoutTemplate: 'mainLayout',
  yieldTemplates: {
    header: { to: 'header' },
    footer: { to: 'footer' },
  }
});

Router.route('/', {
  name: 'home',
  template: 'home',
  yieldTemplates: {
    header: { to: 'header' },
    footer: { to: 'footer' },
  }
});
