module.exports = {
    mode: 'dev', // [dev/prod]
    log: 'sleepyzzz-api.log',
    token: {
        life: '24h',
        secret: '',
        setupTime: 2000
    },
    sampling: {
        interval: 200
    },
    dev: {
        port: 8080,
        host: 'localhost',
        protocol: 'http',
        database: {
            url: 'https://sleepyzzz-38a10.firebaseio.com/',
            serviceAccount: './svc-sleepyzzz.json',
            node: 'sleepyzzz-dev'
        },
        apiAuth: {
            username: '',
            password: ''
        }
    },
    prod: {
        port: 3000,
        host: '',
        protocol: '',
        database: {
            url: 'https://sleepyzzz-38a10.firebaseio.com/',
            serviceAccount: './svc-sleepyzzz.json',
            node: 'sleepyzzz'
        },
        apiAuth: {
            username: '',
            password: ''
        }
    },
    api: {
        version: 'v1'
    }
};
