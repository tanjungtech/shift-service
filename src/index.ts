require("dotenv").config()

const SERVER_PORT = process.env.SERVER_PORT
const BASE_API_URL = process.env.BASE_API_URL
const NODE_ENV = process.env.NODE_ENV
const MONGODB_URL = process.env.MONGODB_URL

if (!SERVER_PORT)
  console.log(`No port defined. Current defined port: ${SERVER_PORT}`)

if (!BASE_API_URL)
  console.log(`Please provide BASE_API_URL: ${BASE_API_URL}`)

import express = require("express")

const bodyParser = require('body-parser')
  
  const app: express.Application = express(),
  router = express.Router(),
  routes = require('./routes/index'),

  { createProxyMiddleware } = require('http-proxy-middleware')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

if (NODE_ENV === 'development') {
  const allowed_origins = ['http://localhost:3200']
  app.use(function(req, res, next) {
    if (allowed_origins.includes(req.headers.origin!)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
    }
    res.header("Access-Control-Allow-Credentials", "TRUE")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-xsrf-token")
    next()
  })
  // app.use('/', createProxyMiddleware({ target: 'http://localhost:8200', changeOrigin: true }))
  app.use(`${BASE_API_URL}`, routes(router), createProxyMiddleware({ target: `http://localhost:${SERVER_PORT}`, changeOrigin: true }))
} else {
  app.use(`${BASE_API_URL}`, routes(router))
}

app.listen(`${SERVER_PORT}`, () => {
  console.log(`Server now listening at localhost:${SERVER_PORT}`)
})

const mongoose = require('mongoose'),
  options = { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }

mongoose.connect(`${MONGODB_URL}`, options).catch((error: any) => console.log(error))

module.exports = app
