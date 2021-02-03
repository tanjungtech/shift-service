const account_controller = require('../controllers/account')

module.exports = (router: any) => {

  router.route('/account/all').get(account_controller.getAllAccounts)
  // router.route('/account/single')
  //   .post(account_controller.postSingleAccount)
  //   .get(account_controller.getSingleAccount)
}

