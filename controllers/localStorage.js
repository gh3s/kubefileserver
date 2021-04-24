const 
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    mime = require('mime/lite')

const 
    readdir = util.promisify(fs.readdir),
    unlink = util.promisify(fs.unlink),
    createReadStream = fs.createReadStream

module.exports = class {
    //Constructor
    constructor(folder){
        this.folder = folder
    }

    deleteFile = async (file) => {
        return unlink(this.folder + file) 
    }

    getFile = async(fileName) => {
        let filePath = path.join(this.folder, fileName)
        let stats = await fs.promises.stat(filePath)
        let fileData = {
            stream: createReadStream(filePath, { autoClose: true}),
            name: fileName,
            time: stats.mtimeMs,
            size: stats.size,
            type: mime.getType(this.folder + '/' + fileName)
        }
        return fileData
    }

    readMediaFolder = async (folder) => {
        return readdir(folder)
        .then(files => {
            return files.map(fileName => {
                return {
                    name: fileName,
                    time: fs.statSync(folder + '/' + fileName).mtime.getTime(),
                    size: fs.statSync(folder + '/' + fileName).size,
                    mime: mime.getType(folder + '/' + fileName)
                }
            })
            .sort((a, b) => {   //Sort in reverse chronological order
                return b.time - a.time
            })            
        })

    }
}
// }
// module.exports = async (folder, limit) => {
//     return readdir(folder)
//     .then(files => {
//         //let elements = []
//         return files.map(fileName => {
//             return {
//                 name: fileName,
//                 time: fs.statSync(folder + '/' + fileName).mtime.getTime(),
//                 size: fs.statSync(folder + '/' + fileName).size
//             }
//         })
//         .sort((b, a) => {   //Sort in reverse chronological order
//             return a.time - b.time 
//         })
//         .reduce((sum, elem, index, array ) => {
//             if(sum > limit){
//                 //console.log(elements)
//                 //elements.push(elem)
//                 //! TODO: implement delete files
//             }
//             return sum + elem.size
//         }, 0)
//         //return elements
//     })
//     .catch(err => {
//         return err
//     })
// }