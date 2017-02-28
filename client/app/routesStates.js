/*
    = App Router:States


    == ensureLogin Function : loginRequired.
    
    
    == Resolve Function :
    
    
        resolve: {
    currentUser($q) {
        if (Meteor.userId() === null) {
            return $q.reject();
        } else {
            return $q.resolve();
        }
            }
        }


*/


angular.module('randomino').config(function ($stateProvider, $urlRouterProvider) {

    /*

      Here we setup the views of our app.
      In this case:
      - feed, account, shop, checkout, cart will require login
      - app will go to the "start view" when launched.

      #IMPLEMENTATION-DETAIL: views that require authorizations have an
      "auth" key with value = "true".

    */

    $stateProvider

        .state('app', {
        url: '/app',
        //abstract: true,
        templateUrl: 'client/templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.start', {
        url: '/start',
        views: {
            'menuContent': {
                templateUrl: 'client/templates/start.html',
                controller: 'loginSocial'
            }
        }
    })

    .state('app.login', {
        url: '/login',
        cached: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    })


    .state('app.tutorial', {
        url: '/tutorial',
        views: {
            'menuContent': {
                templateUrl: 'client/templates/tutorial.html'
            }
        }
    })

    .state('app.loginTest', {
        url: '/login/test',
        cached: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/_loginTest.html',
                controller: 'LoginCtrlTest'
            }
        }
    })

    .state('app.forgot', {
        url: '/forgot',
        views: {
            'menuContent': {
                templateUrl: 'client/templates/forgot.html'
            }
        }
    })

    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'client/templates/register.html'
            }
        }
    })

    .state('app.test', {
        url: '/test',
        views: {
            'menuContent': {
                templateUrl: 'client/templates/test.html'
            }
        }
    })

    .state('app.signup', {
        url: '/signup',
        views: {
            'menuContent': {
                templateUrl: 'client/templates/signup.html'
            }
        }
    })


    // Show User's Profile.

    .state('app.account', {
        url: '/account',
        data: {
            auth: false
        },
        views: {
            'menuContent': {
                templateUrl: 'client/templates/account.html',
                controller: 'profilePageCtrl'
            }
        },
        //resolve: loginRequired

    })


    // Pages List

    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'client/templates/about.html',
                controller: 'pagesCtrl'
            }
        }
    })
    .state('app.page', {
        url: '/page/:pageId',
        // cache: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/about-single.html',
                controller: 'pageCtrl'
            }
        },
        // resolve: loginRequired
    })
    .state('app.faq', {
        url: '/faq',
        data: {
            auth: true
        },
        views: {
            'menuContent': {
                templateUrl: 'client/templates/faq.html',
                controller: 'FAQCtrl'
            }
        },
        // resolve: loginRequired

    })

    .state('app.settings', {
        url: '/settings',
        data: {
            auth: true
        },
        views: {
            'menuContent': {
                templateUrl: 'client/templates/settings.html',
                controller: 'usrSettings'
            }
        },
        //resolve: loginRequired

    })

    .state('app.settings-language', {
        url: '/settings-language',

        views: {
            'menuContent': {
                templateUrl: 'client/templates/settings-language.html',
                controller: 'languageSetting'
            }
        },
        //resolve: loginRequired

    })

    .state('app.settings-shipment', {
        url: '/settings-shipment',
        data: {
            auth: true
        },
        views: {
            'menuContent': {
                templateUrl: 'client/templates/settings-shipment.html',
                controller: 'settingsShipment'
            }
        },
        // resolve: loginRequired

    })

    .state('app.feed', {
        url: '/feed',
        data: {
            auth: true
        },
        views: {
            'menuContent': {
                templateUrl: 'client/templates/feed.html',
                controller: 'FeedsCtrl'
            }
        },
        //resolve: loginRequired



    })

    .state('app.shop', {
        url: '/shop',
        data: {
            auth: true
        },
        views: {
            'menuContent': {
                templateUrl: 'client/templates/shop.html',
                controller: 'ShopCtrl'
            }
        },
        //resolve: loginRequired
    })

    .state('app.shop-details', {
        url: '/shop-details/:productId',
        data: {
            auth: true
        },

        views: {
            'menuContent': {
                templateUrl: 'client/templates/shop-details.html',
                controller: 'ProdetailsCtrl'
            }
        },
        //resolve: loginRequired
    })

    .state('app.order', {
        url: '/order',
        data: {
            auth: true
        },
        views: {
            'menuContent': {
                templateUrl: 'client/templates/order.html',
                controller: 'OrdersCtrl'
            }
        },
        //resolve: loginRequired
    })

    .state('app.challenge-start', {
            url: '/challenge-start/:productId',
            data: {
                auth: true
            },
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/challenge-start.html',
                    controller: 'startChallange'
                }
            },
            //resolve: loginRequired
        })
        .state('app.challenge-survey-1', {
            url: '/challenge-survey-1',
            data: {
                auth: true
            },
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/challenge-survey-1.html',
                    controller: 'challangeSurvey'
                }
            }
        })
        .state('app.challenge-play', {
            url: '/challenge-play/:playId',
            data: {
                auth: true
            },
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/challenge-play.html',
                    controller: 'challengePlay'
                }
            },
            //resolve: loginRequired

        })
        .state('app.challenge-won', {
            url: '/challenge-won/:productId/:playId',
            data: {
                auth: true
            },
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/challenge-won.html',
                    controller: 'challengeWon'
                }
            },
            //resolve: loginRequired

        })
        .state('app.challenge-failed', {
            url: '/challenge-failed/:playId',
            data: {
                auth: true
            },
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/challenge-failed.html',
                    controller: 'challengeFailed'
                }
            },
            //resolve: loginRequired
        }).state('app.challenge-failed-product', {
            url: '/challenge-failed-p/:productId',
            data: {
                auth: true
            },
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/challenge-failed.html',
                    controller: 'challengeFailed'
                }
            },
            //resolve: loginRequired
        })
        .state('app.cart', {
            url: '/cart',
            data: {
                auth: true
            },
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/cart.html',
                    controller: 'CartCtrl'
                }
            },
            // resolve: loginRequired
        })

    .state('app.checkout', {
        url: '/checkout/:playId',
        data: {
            auth: true
        },
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/checkout.html',
                controller: 'checkOutCtrl'
            }
        },
        
    })

    .state('app.checkout-address', {
        url: '/checkout-address/:playId',
        data: {
            auth: true
        },
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/checkout-address.html',
                controller: 'checkoutAddress'
            }
        },
        
    })

    .state('app.checkout-payment', {
        url: '/checkout-payment/:playId',
        data: {
            auth: true
        },
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/checkout-payment.html',
                controller : 'checkoutPayment'
            }
        },
        
    })

    .state('app.checkout-terms', {
        url: '/checkout-terms/:playId',
        data: {
            auth: true
        },
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/checkout-terms.html',
                controller : 'checkoutTerms'
            }
        },
        // resolve: loginRequired

    })

    .state('app.checkout-payment-credit-card', {
        url: '/checkout-payment-credit-card',

        cache: true,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/checkout-payment-credit-card.html'
            }
        },
        //resolve: loginRequired

    })

    .state('app.checkout-confirm', {
        url: '/checkout-confirm/:playId',

        cache: true,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/checkout-confirm.html',
                controller: 'checkoutConfirm'
            }
        },
        //resolve: loginRequired

    })

    .state('app.checkout-successful', {
        url: '/checkout-successful',
        data: {
            auth: true
        },
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'client/templates/checkout-successful.html',
                controller: 'surveyCtrl'
            }
        },
        //resolve: loginRequired

    })

    .state('app.surveys', {
            url: '/surveys',
            //cache: true,
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/survey.html',
                    //                    templateUrl: 'client/templates/challenge-survey-select.html',
                    controller: 'surveyCtrl'
                }
            },
            //resolve: loginRequired

        })
        .state('app.survey', {
            url: '/survey/surveyId',
            cache: false,
            data: {
                auth: true
            },
            views: {
                'menuContent': {
                    templateUrl: 'client/templates/survey.html',
                    controller: 'surveyCtrl'
                }
            },
            //resolve: loginRequired

        })

    // If none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/start');

});