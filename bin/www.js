const chalk = require('chalk')
const app = require('../server')
const port = process.env.SHOPIFY_APP_PORT || '3000'

app.listen(port, () => {
  console.log(`🚀  Now listening on port ${chalk.green(port)}`)
}) 