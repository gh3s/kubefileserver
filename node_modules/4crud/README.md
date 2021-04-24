# 4Crud

> VERY SMALL (7kb) and fast Node.js module for API development written with ES6 features.

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/gh3s/4crud/graphs/commit-activity)
[![HitCount](https://img.shields.io/github/issues/gh3s/4crud/total.svg)](http://hits.dwyl.io/GH3S/4CRUD)
[![npm](https://img.shields.io/npm/dw/4crud)](https://www.npmjs.com/package/4crud)

## Getting Started

A fast and VERY SMALL Node.js framework for API development written with javascript ES6 features.

### Prerequisites

* nodejs 12.x +

### Installing

```sh
npm install 4crud --save
```

### Testing

This project uses Mocha-Chai combination in /test folder
```sh
npm test
```
or
```sh
node test/server.js
```
and in other cli type:
```sh
curl localhost:3000/getroute1?name=john

curl -X POST -H "Content-Type: application/json" -d '{"name":"john","password":"abc"}' localhost:3000/postroute1
```
## Features
* Routing
* Fast performance (Remember, ES6 have some intrinsic slowdowns but yes, it's fastest as express.js!)
* Fast implementation on any type of API
* Very small (just 7 KB!)

## Example

```js
const Server = require('../')
const server = new Server()

server
  // curl localhost:3000/getroute1?name=john
  .get('/route1', (req, res) => {
    console.log(`GET on route 1 with name: ${req.search.get('name')}`)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.url))
  })
  .get('/route2', (req, res) => {
    //console.log('GET on route 2')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('Hello')
  })
  // curl -X POST -H "Content-Type: application/json" -d '{"name":"john","password":"abc"}' localhost:3000/postroute1
  .post('/route1', (req, res) => {
    console.log(`POST route 1 with name ${req.body.name}`)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.body))
  })
  .post('/route2', (req, res) => {
    console.log('POST on route 2')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.body))
  })
  .put('/route1', (req, res) => {
    console.log('PUT on route 1')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.body))
  })
  .delete('/route2', (req, res) => {
    console.log(`DELETE on route 1 with name ${req.body.name}`)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.body))
  })
  .start(3000) // start server at port 3000

```

## Express.js comparison

Bellow the benchmark uses wrk (https://github.com/wg/wrk/wiki/Installing-Wrk-on-Linux)

Run on your preferred CLI on /test folder with server on:
```sh
wrk -t8 -c100 -d30s http://localhost:3000/getroute1
```

|  Framework |  Requests/second | Size(kB) |
|---|---|---|
| Express  | 9404.79  | 200 |
| 4crud  |  19761.31 | 7 |
| | | |




## Running

```sh
npm start
```

## Release History

* 0.0.1
  * CHANGE: Work in progress
* 0.1.0
  * Basic routing implemented
* 0.1.5
  * File server example added
  * Bugs fixed
  * Benchmark corrected

## Authors

* **GH3S** - *Initial work*  - gh3s@protonmail.ch

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributing
1. Fork it (<https://github.com/gh3s/4crud/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
