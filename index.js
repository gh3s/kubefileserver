const Server = require('4crud')
const storage = require('./controller')

const folder = './files'

const server = new Server()
let Storage = new storage(folder)

server
  .get('/listFiles', (req, res) => {
    Storage.readMediaFolder(folder)
    .then(files => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(files))
    })
  })
  /*.get('/download', (req, res) => { //?fileName=
    if(req.search.get('video')){
      res.writeHead(200, {"Content-Type": "video/mp4"})
      Storage.getFile(req.search.get('video'))
      .then(data=>{
          data.pipe(res)
      })
    } else {console.log('error')}
  })*/
  .get('/last', (req, res) => { //?fileName=
    Storage.readMediaFolder(folder)
    .then(files => {
      console.log(files[0].name)
      res.writeHead(200, {"Content-Type": "video/mp4"})
      Storage.getFile(files[0].name)
      .then(data=>{
          data.pipe(res)
      })
    })
  })
  .start(3000) // start server at port 3000