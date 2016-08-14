# processmaker
A simple and minimalistic NodeJs wrapper for ProcessMaker REST API

Project platform: NodeJs

Dependencies: request

## Installation ##

```javascript
npm install processmaker or npm i processmaker
```

## Getting Started ##

### Import the class ###

```javascript
var ProcessMaker = require('processmaker');
```

### Initialize the client ###

```javascript
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

```

For more on registering the app on processmaker and authentication, head over to http://wiki.processmaker.com/3.0/OAuth_2.0


### Call the ProcessMaker API

Listen for the ready event on the client, and then call your API

```javascript
pmClient.on('ready', () => {
  pmClient.exec({ url: 'http://127.0.0.1:8080/api/1.0/workflow/cases', method: 'GET' }, (err, res) => {
    if (err)
      console.log(res);
    else
      console.log(res);
  });
});
```

#### Don't like callbacks? I've got you covered

```javascript
pmClient.on('ready', () => {
  pmClient.execAsync({ url: 'http://127.0.0.1:8080/api/1.0/workflow/cases', method: 'GET' })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
```

Docs for ProcessMaker REST APIs:
* Calling and Endpoint: http://wiki.processmaker.com/3.0/Calling_REST_Endpoints
* Administration APIs: http://wiki.processmaker.com/3.0/REST_API_Administration
* Designer APIs: http://wiki.processmaker.com/3.0/REST_API_Designer
* Cases APIs: http://wiki.processmaker.com/3.0/REST_API_Cases

## API reference

#### `function exec(fn: Function) --> (options, callback)`
The first argument `options` is used for all options available to use with the request library
The second object is a callback function that will be called once the endpoint response is complete

#### `function execAsync(fn: Function) --> (options) --> Promise`
Takes `options` as first argument just like `exec` and returns a Promise

## Future
* A lot of this code can be better. Firstly, I want to convert to Typescript
* A cleaner Initialization API

## Notes
* This project supports only ProcessMaker 3.x REST APIs
* The exec method wraps the request module; for information on using request, head over to https://github.com/request/request#requestoptions-callback

## License

The MIT License (MIT)

Copyright (c) 2016 Akashdeep Singh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
