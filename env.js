module.exports = {
  server: {
    port: 3000,
    url: 'http://localhost:3000',
  },
  jwt: {
    secret: '`yGE[RniLYCX6rCni>DKG_(3#si&zvA$WPmgrb2P',
    expiresIn: 36000,
  },
  knex: {
    client: 'mysql',
    connection: {
      host: 'bj-cdb-2zonkmfh.sql.tencentcdb.com',
      port: 63297,
      user: 'steve',
      password: '******',
      database: 'store_app',
    },
    pool: { min: 0, max: 7 },
    debug: true,
    asyncStackTraces: true,
    fetchAsString: ['date', 'datetime'],
  },
};
