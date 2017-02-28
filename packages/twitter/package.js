Package.describe({
  name: 'neox:twitter',
  summary: "Twitter OAuth flow",
  version: '1.1.11',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});



Package.onUse(function(api) {
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.export('Twitter');

//  api.addFiles(
//    ['twitter_configure.html', 'twitter_configure.js'],
//    'client');

  api.addFiles('twitter_server.js', 'server');
  api.addFiles('twitter_client.js', 'client');
});