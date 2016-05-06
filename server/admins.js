import { Roles } from 'meteor/alanning:roles';

const admins = [
  { name: 'Sebastian Kasanzew', email: 'sebkasanzew@gmail.com', roles: ['admin'] },
  { name: 'Thereza Schmelter', email: 'therezaschmelter@googlemail.com', roles: ['admin'] },
  { name: 'Elias Lerch', email: 'elias.lerch@t-online.de', roles: ['admin'] },
];

_.each(admins, (admin) => {
  if (!Meteor.users.findOne({ 'emails.address': admin.email })) {
    const id = Accounts.createUser({
      email   : admin.email,
      password: 'shapeLab!',
      profile : { name: admin.name }
    });

    if (!admin.roles.length) {
      Roles.addUsersToRoles(id, admin.roles, 'default-group');
    }
  }
});
