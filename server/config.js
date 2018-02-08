module.exports = {
    mode: 'dev', // [dev/prod]
    log: 'sleepyzzz-api.log',
    token: {
      life: '24h',
      secret: ''
    },
    sampling: {
      interval: 100
    },
    dev: {
        port: 8080,
        host: 'localhost',
        protocol: 'http',
        database: {
            url: "https://sleepyzzz-38a10.firebaseio.com/",
            serviceAccount: "./svc-sleepyzzz.json",
            node: "sleepyzzz-dev"
        }
    },
    prod: {
        port: 3000,
        host: '',
        protocol: '',
        database: {
            url: "https://sleepyzzz-38a10.firebaseio.com/",
            serviceAccount: "./svc-sleepyzzz.json",
            node: "sleepyzzz"
        }
    },
    api: {
        version: 'v1'
    }
};
