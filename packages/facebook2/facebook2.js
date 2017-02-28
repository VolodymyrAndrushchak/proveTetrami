//// Write your package code here!
//
//// Variables exported by this module can be imported by other packages and
//// applications. See facebook2-tests.js for an example of importing.
//export const name = 'facebook2';
//
//
//
//
//Meteor.startup(function () {
//
//    Package['facebook'].getTokenResponse = function (query) {
//        console.log('overriding Request : of Facebook Main Package ' + query)
//
//
//        var config = ServiceConfiguration.configurations.findOne({
//            service: 'facebookx'
//        });
//
//        console.log(config)
//
//        if (!config)
//            throw new ServiceConfiguration.ConfigError();
//
//        var responseContent;
//        try {
//            // Request an access token
//            responseContent = HTTP.get(
//                "https://graph.facebook.com/v2.2/oauth/access_token", {
//                    params: {
//                        client_id: config.appId,
//                        redirect_uri: OAuth._redirectUri('facebook', config),
//                        client_secret: OAuth.openSecret(config.secret),
//                        code: query.code
//                    }
//                }).content;
//        } catch (err) {
//            throw _.extend(new Error("Failed to complete OAuth handshake with Facebook. " + err.message), {
//                response: err.response
//            });
//        }
//
//        // If 'responseContent' parses as JSON, it is an error.
//        // XXX which facebook error causes this behvaior?
//        if (isJSON(responseContent)) {
//            throw new Error("Failed to complete OAuth handshake with Facebook. " + responseContent);
//        }
//
//        // Success!  Extract the facebook access token and expiration
//        // time from the response
//        var parsedResponse = querystring.parse(responseContent);
//        var fbAccessToken = parsedResponse.access_token;
//        var fbExpires = parsedResponse.expires;
//
//        if (!fbAccessToken) {
//            throw new Error("Failed to complete OAuth handshake with facebook " +
//                "-- can't find access token in HTTP response. " + responseContent);
//        }
//        return {
//            accessToken: fbAccessToken,
//            expiresIn: fbExpires
//        };
//
//
//    };
//
//});