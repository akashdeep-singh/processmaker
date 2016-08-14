'use strict';
/* This code uses es6 features that are available only in strict mode.
   Some linters may flag some of these as warnings
   As long as you're running Node.js 4.4.x you're fine
*/

//Module dependencies
const request = require('request');
const EventEmitter = require('events');

/**
 * This class is a simple minimalistic wrapper for ProcessMaker BPM and
 * provides a simple event driven API to authenticate and make REST API calls
 * 
 * @class ProcessMaker
 * @extends {EventEmitter}
 */
class ProcessMaker extends EventEmitter {
  /**
   * Creates an instance of ProcessMaker.
   * 
   * @param {any} username
   * @param {any} password
   * @param {any} baseUri
   * @param {any} client_id
   * @param {any} client_secret
   * @param {any} scope
   * @param {any} workspace
   */
  constructor(username, password, baseUri, client_id, client_secret, scope, workspace) {
    super();
    this.__username = username;
    this.__password = password;
    this._baseUri = baseUri;
    this.__client_id = client_id;
    this.__client_secret = client_secret;
    this.__scope = scope;
    this._workspace = workspace || 'workflow';
    this._authenticate().then((res) => {
      this.__access_token = res.access_token;
      this.emit('ready');
    });
  }

  /**
   * An internal method used to authenticate with the configured ProcessMaker REST API server
   * 
   * @param {any} done
   * @returns {Promise}
   */
  _authenticate(done) {
    var options = {
      url: this._baseUri + this._workspace + '/oauth2/token',
      method: 'POST',
      json: true,
      body: {
        grant_type: 'password',
        scope: this.__scope,
        client_id: this.__client_id,
        client_secret: this.__client_secret,
        username: this.__username,
        password: this.__password
      }
    };

    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if (err)
          reject(err);
        else
          resolve(body);
      });
    });
  }

  /**
   * The method actually executed the HTTP call using request module
   * This method is callback based
   * 
   * @param {any} options
   * @param {callback} done
   */
  exec(options, done) {
    request((Object.assign(options, {
      headers: {
        'authorization': 'Bearer ' + this.__access_token
      }
    })), function (err, response, body) {
      done(err, body);
    });
  }

  /**
   * This method performs the same function as the exec method but
   * returns a promise instead of using callbacks
   * 
   * @param {any} options
   * @returns
   */
  execAsync(options) {
    return new Promise((resolve, reject) => {
      this.exec(options, (err, body) => {
        if (err)
          reject(err);
        else
          resolve(body);
      });
    });
  }
}

module.exports = ProcessMaker;