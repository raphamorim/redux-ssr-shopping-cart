/*
 * Config environments.
 */
let Config = {}

/*
 * Set current environment.
 */
Config.env = process.env['NODE_ENV'] || 'development'

/*
 * Set specific time definitions.
 */
Config.time = {
  hour: 3600000
}

/*
 * Environment: Development.
 */
Config.development = {
  name: 'development',
  mongo: 'mongodb://localhost/shop',
  defaultUrl: 'http://localhost',
  serverPort: 3000,
  logNamespace: 'development',
  log4js: {
    console: {
      type: 'console'
    },
    file: {
      type: 'file',
      filename: 'development.log',
      maxLogSize: 20480,
      backups: 3,
      pollInterval: 15
    }
  }
}

/*
 * Environment: Production.
 */
Config.production = {
    name: 'production',
    mongo: process.env['MONGODB_URI'],
    defaultUrl: 'http://localhost',
    serverPort: 3000,
    logNamespace: 'production',
    log4js: {
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: 'production.log',
            maxLogSize: 20480,
            backups: 6,
            pollInterval: 15
        }
    }
}

const config = Config[Config.env]
export default config