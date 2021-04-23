const http = require('http')

class Helper {
  fncStore (url, fnc, method) {
    this[method].url.push(url)
    this[method].fnc.push(fnc)
  }

  start (port) {
    http.createServer((req, res) => {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })
      req.on('end', async () => {
        try {
          if (body !== '') {
            req.body = JSON.parse(body)
          } // TODO: Implement another acceptable methods than JSON
          const urlParams = new URL(req.url, `http://${req.headers.host}`)
          req.search = urlParams.searchParams // Inserted search method in request
          const path = urlParams.pathname
          const npath = this[req.method].url.indexOf(path)
          if (npath !== -1) {
            this[req.method].fnc[npath](req, res)
          } else {
            res.end('invalid route') // Find method URLs.  If url exists in url array, then execute relative function (fnc is an array)
          }
        } catch (e) {
          req.search = 'invalid search'
          return e
        }
      })
    }).listen(port)
  }
}

class Server extends Helper {
  constructor (url, fnc) {
    super(url, fnc)
    this.GET = {
      url: [],
      fnc: []
    }

    this.POST = {
      url: [],
      fnc: []
    }

    this.PUT = {
      url: [],
      fnc: []
    }

    this.DELETE = {
      url: [],
      fnc: []
    }
  }

  get (url, fnc) {
    this.fncStore(url, fnc, 'GET')
    return this
  }

  post (url, fnc) {
    this.fncStore(url, fnc, 'POST')
    return this
  }

  put (url, fnc) {
    this.fncStore(url, fnc, 'PUT')
    return this
  }

  delete (url, fnc) {
    this.fncStore(url, fnc, 'DELETE')
    return this
  }
}

module.exports = Server
