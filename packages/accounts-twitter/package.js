Package.describe({
    name: 'neox:accounts-twitter',

    // Brief, one-line summary of the package.
    summary: "Login service for Twitter accounts",
    version: "1.0.10",
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.use('underscore', ['server']);
    api.use('accounts-base', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('neox:twitter', ['client', 'server']);

    api.use('http', ['client', 'server']);

//    api.addFiles('twitter_login_button.css', 'client');

    api.addFiles("twitter.js");
});