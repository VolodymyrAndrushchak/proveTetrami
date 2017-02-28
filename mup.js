module.exports = {
    servers: {
        one: {
            host: '46.101.104.104',
            username: 'root',
            password: '123ewqasdA'
                // pem: './mykey',
        },
    },

    meteor: {
        name: 'mobile',
        path: '/Users/neox/Documents/apps/randominoApp',
        servers: {
            one: {},
        },
        buildOptions: {
            debug: true,
            serverOnly: true,
        },

        docker: {
            image: 'werkdigital/meteor-graphicsmagick', //optional
            args: [ //optional, lets you add / overwrite any parameter on the docker run command
//            "--link=mongodb:mongodb --env=MONGO_URL=mongodb://mongodb:27017/web", //linking example
            "--link=mongodb:mongodb", //linking example
            "--env=MONGO_URL=mongodb://mongodb:27017/web"
                //"--memory-reservation 200M" //memory reservation example
                  ]
        },
        env: {
            PORT: 3008,
            //            ROOT_URL: 'http://appx.tetrami.com',

            //            ROOT_URL: 'http://appx.randomino.net',
            ROOT_URL: 'http://app.tetrami.com'
            //                        MONGO_URL: 'mongodb://46.101.111.164:27017/randomino',

            //WORKING
            //MONGO_URL: 'mongodb://172.17.0.3:27017/web',
            //MONGO_URL: 'mongodb://mongodb:27017/web',
            //            MONGO_URL: 'mongodb://188.166.56.29:27001/tetra',
            // with vpn 10.133.17.27 / nmask 255.255.0.0 fxdata
            //MONGO_URL: 'mongodb://46.101.111.164:27017/randomino',
            //            MONGO_URL: 'mongodb://admin:sadws123ewqA@aws-eu-west-1-portal.6.dblayer.com:10199/admin?ssl=true',
            //            MONGO_OPLOG_URL: 'mongodb://oploguser:PC5rNQiFhkTLLjKojAiwdYIa0-Df-uyu0Ufyt6nGDbk@haproxy200.aws-eu-west-1-portal.6.dblayer.com:10200/local?authSource=admin&ssl=true'
            //CLUSTER_WORKERS_COUNT: 'auto'
            //CLUSTER_DISCOVERY_URL: ''
        },
        //dockerImage: 'ianmartorell/meteord-graphicsmagick',
        //Working
        //        dockerImage: 'werkdigital/meteor-graphicsmagick',
        //Main
        //        dockerImage: 'kadirahq/meteord',
        deployCheckWaitTime: 160
    },
    //    //    //
    //    mongo: {
    //        oplog: false,
    //        port: 27017,
    //        servers: {
    //            one: {},
    //        },
    //    }, //
    //    mongo: {
    //        oplog: true,
    //        port: 27017,
    //        servers: {
    //            one: {},
    //        },
    //    },
};