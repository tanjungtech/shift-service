module.exports = { errorOutcome: (res: any, error: any) => {
  console.log('error', error)
  res.status(error.status).send({ message: error.message })
} }