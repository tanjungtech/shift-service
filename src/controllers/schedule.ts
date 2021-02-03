export {}

const { errorOutcome } = require('../utils/errorHandlers')
const Schedule = require('../models/Schedule')
const Account = require('../models/Account')

module.exports = {
  getAllSchedules: async (req: any, res: any) => {
    try {
      console.log('retrieve all schedules')

      const start = req.query.start
      const account_id = req.query.account_id
      const shift_type = req.query.shift_type

      let query:any = { deleted_on: { $lte: 0 } }

      if (start) {
        const start_time_limit = new Date(parseInt(start)).getTime()
        const end_time_limit = start_time_limit + (1000 * 60 * 60 * 24 * 6) + (1000 * 60 * 60 * 23) + (1000 * 60 * 59)
        query = {
          ...query,
          $or: [
            { start_time: { $gte: start_time_limit, $lt: end_time_limit } },
            { end_time: { $gt: start_time_limit, $lte: end_time_limit } }
          ]
        }
        console.log('query', JSON.stringify(query))
      }

      if (account_id) {
        query = { ...query, account_id}
      }
      if (shift_type) {
        query = { ...query, shift_type }
      }

      const schedules = await Schedule.find(query).populate('account_id')
      console.log(schedules)
      res.status(200).send({ schedules })

    } catch (e) {
      console.log(e)
      errorOutcome(res, e)
    }
  },
  postAllSchedules: async (req: any, res: any) => {
    try {
      console.log(req.body)

      const { account_id, shift_type, data, notes } = req.body

      if (!(account_id && data && data.length))
        throw { status: 400, message: 'Incomplete data' }

      const account_from_db = await Account.findById(account_id)

      if (!account_from_db)
        throw { status: 400, message: 'No user detected' }

      const shifts_object = data.map( (d:any, i:number) => {
        return {
          shift_type, notes,
          account_id: account_from_db._id,
          start_time: new Date(parseInt(d.start_time)).getTime(),
          end_time: new Date(parseInt(d.end_time)).getTime(),
          created_at: new Date().getTime()
        }        
      })

      await Schedule.insertMany(shifts_object)
      res.status(200).send({ success: true })

    } catch (e) {
      console.log(e)
      errorOutcome(res, e)
    }
  },
  putAllSchedules: async (req: any, res: any) => {
    try {
      console.log(req.body)

      const { account_id, shift_type, data, notes, deleted_on } = req.body

      if (!(account_id && data && data.length))
        throw { status: 400, message: 'Incomplete data' }

      const account_from_db = await Account.findById(account_id)

      if (!account_from_db)
        throw { status: 400, message: 'No user detected' }

      const shifts_object = data.map( (d:any, i:number) => {
        return deleted_on ?
          {
            _id: d.id,
            deleted_on: new Date().getTime()
          }
          :
          {
            shift_type, notes,
            _id: d.id,
            account_id: account_from_db._id,
            start_time: new Date(parseInt(d.start_time)).getTime(),
            end_time: new Date(parseInt(d.end_time)).getTime()
          }
      })

      for (const shift of shifts_object) {
        console.log('shift', shift)
        const find_schedule = await Schedule.findById(shift._id.toString() )
        const updated_schedule = await Schedule.findOneAndUpdate({ _id: find_schedule._id }, { $set: { ...shift, _id: find_schedule._id} }, { new: true })
        console.log('updated_schedule', updated_schedule)
      }

      res.status(200).send({ success: true })

    } catch (e) {
      console.log(e)
      errorOutcome(res, e)
    }
  }
}