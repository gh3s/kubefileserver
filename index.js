const Server = require('4crud')
const Storage = require('./controllers/localStorage')

const folder = './files'

const server = new Server()
const storage = new Storage(folder)

server
  .get('/listFiles', (req, res) => {
    storage.readMediaFolder(folder)
    .then(files => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(files))
    })
  })
  .get('/download', (req, res) => {
    storage.getFile(req.search.get('fileName'))
    .then(data=>{
      res.writeHead(200, {"Content-Type": data.type})
      data.stream.pipe(res)
    })
    .catch(err=>{
      res.writeHead(404, {"Content-Type": "text/plain"})
      res.write(err.code)
      res.end()
    })
  })
/*   .get('/last', (req, res) => {
    Storage.readMediaFolder(folder)
    .then(files => {
      res.writeHead(200, {"Content-Type": "video/mp4"})
      Storage.getFile(files[0].name)
      .then(data=>{
          data.pipe(res)
      })
    })
  }) */
  .start(3000) // start server at port 3000