const schedule_controller = require('../controllers/schedule')

module.exports = (router: any) => {

  router.route('/schedule/all').get(schedule_controller.getAllSchedules).post(schedule_controller.postAllSchedules).put(schedule_controller.putAllSchedules)
}

