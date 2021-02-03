
(async () => {

  require('dotenv').config({ path: '../../.env' })
  
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

  const Schedule = require('../seeds-model/Schedule')
  const Account = require('../seeds-model/Account')

  try {

    await _connectToMongoose()

    console.log('Connected to: ', MONGODB_URL)

    const find_admin_account = await Account.findOne({ role: 'admin' })

    const end_time = new Date(Date.now() - 3 * 60 * 60 * 1000).getTime()
    const new_schedules = { account_id: find_admin_account._id, start_time: new Date().getTime(), end_time, notes: 'This is the example of the notes', created_at: new Date().getTime() }

    const inserted_schedule = await Schedule.create(new_schedules)

    console.log('inserted_schedule', inserted_schedule)
    
    console.log(`Schedule has been updated`)
  } catch (e) {
    console.log('Cannot update schedule in the database')
    console.log('Reason: ', e)
  }

  process.exit()
})()
