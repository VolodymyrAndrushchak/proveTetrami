Package.describe({
    name: 'neox:facebook2',

    // Brief, one-line summary of the package.
    summary: "Facebook OAuth flow",
    version: "1.2.9",
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});


Package.onUse(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
//  api.use('templating@1.2.13', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Facebook');

//  api.addFiles(
//    ['facebook_configure.html', 'facebook_configure.js'],
//    'client');

  api.addFiles('facebook_server.js', 'server');
  api.addFiles('facebook_client.js', 'client');
});