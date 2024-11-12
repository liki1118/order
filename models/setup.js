const { Pool } = require("pg");
require("dotenv").config()
const pool = new Pool({
    connectionString: process.env.CON_STRING,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports=pool;