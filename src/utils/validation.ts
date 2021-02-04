const Schedule = require('../models/Schedule')
const Account = require('../models/Account')

const shiftValidation = async (account:any, schedules: any[]) => {
  for (const schedule of schedules) {
    const ref_start_time  =new Date(parseInt(schedule.start_time)).getTime()
    const ref_end_time  =new Date(parseInt(schedule.end_time)).getTime()
    console.log('ref_start_time', ref_start_time)
    console.log('ref_end_time', ref_end_time)
    const existing_schedule = await Schedule.findOne({ account_id: account._id, deleted_on: { $lte: 0 }, start_time: { $gte: ref_start_time }, end_time: { $lte: ref_end_time } })
    if (existing_schedule)
      throw { status: 400, message: 'Overlap with existing shift' }
  }
  return true
}

module.exports = {
  shiftValidation
}