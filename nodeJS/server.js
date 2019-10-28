let express = require('express')
let app = express()
let fs = require('fs')
let path = require('path')

app.use('/public/',express.static('./public/'))
app.get('/', function(req, res){
  fs.readFile(path.join(__dirname, 'view', 'index.html'), function(err, data){
    if(err){
      throw err;
    }
    res.end(data)
  })
})
app.listen(8000, function(){
  console.log('Please visit http://localhost:8000')
})
