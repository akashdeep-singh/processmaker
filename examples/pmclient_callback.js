'use strict';

var ProcessMaker = require('../dist/app');

var conf = {
  grant_type: 'password',
  scope: '*',
  "client_id": "A1bC2dEfGhIjKl3MnOpQ4rStuV5wXy6z",
  "client_secret": "A1bC2dEfGhIjKl3MnOpQ4rStuV5wXy6z",
  username: 'user',
  password: 'pass',
  baseUri: 'http://127.0.0.1:8080/'
};

var pmClient = new ProcessMaker(conf.username, conf.password, conf.baseUri, conf.client_id, conf.client_secret, conf.scope);

pmClient.on('ready', () => {

  pmClient.exec({ url: 'http://127.0.0.1:8080/api/1.0/workflow/cases', method: 'GET' }, (err, res) => {
    if (err)
      console.log(res);
    else
      console.log(res);
  });

});
