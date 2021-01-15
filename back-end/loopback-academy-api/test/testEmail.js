const utils = require('../server/utils/utils.js')
const config = require('../server/utils/myConfig.json')

async function main() {

  // send OTP to email
  let resultSend = await utils.sendEmail(
    config.emailCredentials,
    "1753102@student.hcmus.edu.vn",
    'Online Academy - Account activation',
    'Your activate code is: ' + 'sfskfjl435'
  )

}

main()
