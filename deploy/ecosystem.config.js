module.exports = {
    apps: [{
        name: "sleepyzzz-api",
        script: "index.js",
        cwd: "/var/www/production/sleepyzzz-api",
        env_production: {
            NODE_ENV: "production"
        }
    }]
}
