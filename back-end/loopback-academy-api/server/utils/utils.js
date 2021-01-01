var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var randomstring = require("randomstring")
var nodemailer = require('nodemailer')

module.exports = {

  hash: async (password) => {

    return new Promise((resolve, reject) => {

      bcrypt.genSalt(10, function(err, salt) {

        bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          if (err) {
            reject(err)
          }
          resolve(hash)
        })
      })

    })

  },

  compare: async (password, hash) => {

    // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
    return bcrypt.compare(password, hash)
  },


  signJWT: async (payload, key, expiresIn) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, key, { expiresIn: expiresIn }, function(err, token) {
        // console.log(token);
        if (err) {
          reject(err)
        }
        resolve(token)
      })

    })
  },

  verifyJWT: async (token, key, isIgnoreExpiration = false) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, key, { ignoreExpiration: isIgnoreExpiration }, function(err, decoded) {
        // console.log(decoded.foo) // bar
        if (err) {
          reject(err)
        }
        resolve(decoded)
      })

    })
  },

  randomString: (length) => {
    return randomstring.generate(length)
  },

  getCurrentSecondsPlus: (secondsPlus) => {
    let currentSeconds = Math.floor(new Date() / 1000)
    return currentSeconds + secondsPlus
  },

  isCurrentSecondsExceed: (seconds) => {

    let currentSeconds = Math.floor(new Date() / 1000)
    return currentSeconds > seconds
  },


  sendEmail: async (credentials /*{user:, pass:}*/ , toEmail, subject, contentHtml) => {

    return new Promise((resolve, reject) => {

      console.log(toEmail);
      console.log(subject);
      console.log(contentHtml);

      // send to email
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: credentials
      });

      var mailOptions = {
        from: credentials.user,
        to: toEmail,
        subject: subject,
        html: contentHtml,
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          reject(error)
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info)
        }
      });

    })


  },

}
