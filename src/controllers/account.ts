export {}

const { errorOutcome } = require('../utils/errorHandlers')
const Account = require('../models/Account')

module.exports = {
  getAllAccounts: async (req: any, res: any) => {
    try {
      console.log('retrieve all accounts')

      const accounts = await Account.find()
      res.status(200).send({ accounts })

    } catch (e) {
      console.log(e)
      errorOutcome(res, e)
    }
  }
}