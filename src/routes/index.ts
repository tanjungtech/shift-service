const account = require('./account')
const schedule = require('./schedule')

module.exports = (router: any) => {
  account(router)
  schedule(router)
  router.post("/*", function(req: any, res: any){ res.status(404).send("404 not found") })
  router.get("/*", function(req: any, res: any){ res.status(404).send("404 not found") })
  router.put("/*", function(req: any, res: any){ res.status(404).send("404 not found") })
  router.delete("/*", function(req: any, res: any){ res.status(404).send("404 not found") })
  return router
}
