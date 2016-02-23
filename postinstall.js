/* eslint no-var: 0 */
var fs = require('fs')
var execSync = require('child_process').execSync

var commonApp = __dirname + '/DNA_common'

function exec (command) {
  execSync(command, { stdio: [ 0, 1, 2 ] })
}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  fs.stat(commonApp, (err) => {
    if (err) {
      exec('git clone https://github.com/PDXostc/common-app.git ' + commonApp)
    }
  })
}
