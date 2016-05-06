import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Router } from 'meteor/iron:router';

const postLogout = function () {
  Router.go('/login');
};

AccountsTemplates.configure({
  defaultLayout: 'mainLayout',

  // Behavior
  enablePasswordChange       : true,
  forbidClientAccountCreation: true,
  overrideLoginErrors        : true,
  sendVerificationEmail      : false,
  lowercaseUsername          : false,
  focusFirstInput            : true,

  // Redirects
  homeRoutePath  : '/',
  redirectTimeout: 4000,

  // Hooks
  onLogoutHook: postLogout,
  /*
   onSubmitHook: mySubmitFunc,
   preSignUpHook: myPreSubmitFunc,
   postSignUpHook: myPostSubmitFunc,
   */

  // Appearance
  showForgotPasswordLink: true,

  // Client-side Validation
  continuousValidation: true,
  negativeValidation  : true,
  positiveValidation  : true,
  negativeFeedback    : true,
  positiveFeedback    : true,
});

AccountsTemplates.configureRoute('signIn', {
  name          : 'signin',
  path          : '/login',
  template      : 'login',
  layoutTemplate: 'mainLayout',
  redirect      : '/'
});
