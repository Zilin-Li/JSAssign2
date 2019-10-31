const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const Calculator = require('./public/js/ModelNode.js')
// import {Calculator} from "./public/js/Model.js";
let cal = new Calculator()
// maps file extention to MIME types
const mimeType = {
  // '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  // '.png': 'image/png',
  // '.jpg': 'image/jpeg',
  // '.wav': 'audio/wav',
  // '.mp3': 'audio/mpeg',
  // '.svg': 'image/svg+xml',
  // '.pdf': 'application/pdf',
  // '.doc': 'application/msword',
  // '.eot': 'appliaction/vnd.ms-fontobject',
  // '.ttf': 'aplication/font-sfnt'
}
// Create a server
http.createServer(function (req, res) {
  req.url = req.url.toLowerCase()
  req.method = req.method.toLowerCase()
  console.log(req.url)
  // Parse the request containing file name
  let pathname = url.parse(req.url).pathname
  // Get the extension of the required file
  const ext = path.parse(pathname).ext
  if(req.url === '/' || req.url === '/index' && req.method ==='get'){
    //read index.html and return
    fs.readFile(path.join(__dirname, 'view', 'index.html'), function(err, data){
      if(err){
        throw err
      }
      res.end(data)
    })
  }else if(req.url.startsWith('/public') && req.method ==='get'){
    //if user's request starts from "/public", means user requested static resources
    fs.readFile(path.join(__dirname, req.url), function(err, data){
      if(err){
        throw err
      }
      res.writeHead(200, {
        'Content-Type': mimeType[ext]
      })
      res.end(data)
    })
  }else if(req.url.startsWith('/?') && req.method ==='get'){
    let getUserData = url.parse(req.url, true).query

    let array1 =getUserData.array1.split(",").map(function(item){
          return parseFloat(item,10)
        })
    let array2 =getUserData.array2.split(",").map(function(item){
          return parseFloat(item,10)
        })

        console.log(array1)
        console.log(array2)

    cal.results(array1, array2)
    //prepare result for user
    let result = {
                 Rxy : cal.Rxy,
                 R2 : cal.R2,
                 Bata1 : cal.Bata1,
                 Bata0 : cal.Bata0,
    }
    //return JSON result
    result = JSON.stringify(result)
    res.write(result)
    res.end()
  }
  else
  {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.end('404, Page Not Found.')
  }
  // // Parse the request containing file name
  // let pathname = url.parse(request.url).pathname
  // // Get the extension of the required file
  // const ext = path.parse(pathname).ext
  //
  //
  //
  // // Print the name of the file for which request is made.
  // console.log("Request for " + pathname + " received.")
  //
  // // Read the requested file content from file system
  // // var fileName ='site' pathname.substr(1)
  // let filePath = path.join('site', pathname.substr(1))
  // console.log(filePath)
  // fs.readFile(filePath, function (err, data) {
  //   if (err) {
  //     console.log(err)
  //     // HTTP Status: 404 : NOT FOUND
  //     // Content Type: text/plain
  //     response.writeHead(404, {
  //       'Content-Type': 'text/html'
  //     })
  //     response.end(`File ${pathname} not found!`)
  //     return
  //   }
  //
  //   // Corresponding file found
  //   // HTTP Status: 200 : OK
  //   response.writeHead(200, {
  //     'Content-Type': mimeType[ext]
  //   })
  //
  //   // Write the content of the file to response body
  //   response.write(data)
  //
  //   // Send the response body
  //   response.end()
  // })
}).listen(8080)
// Console will print the message
console.log('Server running at localhost:8080/')
