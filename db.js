const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'au23st08',
    database: 'crmtt'
});

module.exports = pool;