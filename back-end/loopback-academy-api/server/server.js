// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};


async function main() {

  // get config from database
  await require('./utils/startup.js').start()

  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, async function(err) {
    if (err) throw err;

    // add remote method for auth route
    require('./utils/utils.js')
    await require('./routes/auth.js')
    await require('./routes/chapter.js')
    await require('./routes/video.js')
    await require('./routes/account.js')
    await require('./routes/feedback.js')
    await require('./routes/category.js')

    // connect db for custom.js
    await require('./utils/myModel.js').connect()
    await require('./routes/custom.js')

    // start the server if `$ node server.js`
    if (require.main === module)
      app.start();
  });
}


main()