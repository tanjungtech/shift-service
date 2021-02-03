
(async () => {
  require('dotenv').config({ path: '../../.env' })

  const Account = require('../seeds-model/Account')
  
  const mongoose = require('mongoose')

  const MONGODB_URL = process.env.MONGODB_URL
  if (!MONGODB_URL) throw 'MONGODB_URL needs to be defined as Environment Variable, e.g. mongodb://localhost:27017/academy'

  const _connectToMongoose = async () => {
    mongoose.Promise = global.Promise
    const option = { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }
    mongoose.connect(MONGODB_URL, option)
  
    const mongoose_db = mongoose.connection
    mongoose_db.on('error', console.error.bind(console, 'Mongoose connection error'))
  }

  console.log('seed account: find seed file')

  const new_accounts = [
    { name: 'Admin', role: 'admin', created_at: new Date().getTime() },
    { name: 'Boom', role: 'staff', created_at: new Date().getTime() },
    { name: 'Crash', role: 'staff', created_at: new Date().getTime() },
    { name: 'Dump', role: 'staff', created_at: new Date().getTime() }
  ]

  try {

    await _connectToMongoose()

    console.log('Connected to: ', MONGODB_URL)

    const inserted_account = await Account.insertMany(new_accounts)

    console.log('inserted_account', inserted_account)
    
    console.log(`Account has been updated`)
  } catch (e) {
    console.log('Cannot update account in the database')
    console.log('Reason: ', e)
  }

  process.exit()
})()
