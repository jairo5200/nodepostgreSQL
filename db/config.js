const {config} = require('../config/config');



const URI = config.dbUrl;


module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: config.dbEngine,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
