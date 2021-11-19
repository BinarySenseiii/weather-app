const path = require('path')
require("dotenv").config()

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}