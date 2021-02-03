require('dotenv').config()

const Pool = require('pg').Pool

const DB_PORT = process.env.DB_PORT,
  DB_NAME = process.env.DB_NAME,
  DB_HOST = process.env.DB_HOST,
  DB_USER = process.env.DB_USER

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: '',
  port: DB_PORT
})

module.exports = { pool }