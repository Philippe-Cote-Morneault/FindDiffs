module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
      // First application
      {
        name: 'LOG2990',
        script: 'server/out/server/app/www.js',
        env_production: {NODE_ENV: 'production'}
      }
    ],
  
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
      production: {
        user: 'root',
        host: [
            {
                host: "log2990.martinpouliot.ca",
                port: "8478"
            }
        ],
        ref: 'origin/develop',
        repo: 'git@gitlab.com:log2990-106/log2990.git',
        path: '/root/log2990/',
        'pre-deploy': 'git reset --hard',
        'post-deploy':
          'cd server && npm install && npm run tsc && cd .. && pm2 reload ecosystem.config.js --env production'
      }
    }
  }