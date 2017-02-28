Package.describe({
  name: 'neox:accounts-facebook',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: "Neox : Login service for Facebook accounts",
  version: "1.0.10",
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('neox:facebook2', ['client', 'server']);

  api.addFiles('facebook_login_button.css', 'client');

  api.addFiles("facebook.js");
});
