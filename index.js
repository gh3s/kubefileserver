const Server = require('4crud')
const storage = require('./controller')

const folder = './files'

const server = new Server()
let Storage = new storage(folder)

server
  .get('/listFiles', (req, res) => {
    //console.log(`GET on '/download' with filename: ${req.search.get('filename')}`)
    Storage.readMediaFolder(folder)
    .then(files => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(files))
    })
  })
  .get('/download', (req, res) => { //?fileName=
    console.log(`GET on '/download' with filename: ${req.search.get('filename')}`)
    var head = {
        "Content-Type": "video/mp4"
    }
    res.writeHead(200, head);
    Storage.getFile(req.search.get('fileName'))
    .then(data=>{
        data.pipe(res)
    })
  })
  .start(3000) // start server at port 3000