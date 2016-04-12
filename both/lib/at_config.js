import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Router } from 'meteor/iron:router';

AccountsTemplates.configure({
  defaultLayout: 'mainLayout',
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/login',
  template: 'login',
  layoutTemplate: 'mainLayout',
  redirect: '/'
});
