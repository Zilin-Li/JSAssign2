var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
var express = require('express')
const readMultipleFiles = require('read-multiple-files');
const Calculator2 = require('./public/js/Model.js')
let cal = new Calculator2()

var app = express()

let arr1 = ''
let arr2 = ''
var array1 = ''
var array2 = ''
var path1 = ''
var path0 = ''

//add public resources
app.use('/public/', express.static('./public/'))


// app.get('', function(req, res){
//
// })



app.get('/', function(req, res){

  fs.readFile(path.join(__dirname,'view','index.html'), function(err, data){
    if(err){
      throw err;
    }
    res.end(data)
  })
})







app.get('/cal', function(req, res){
  arr1 = array1.toString()
  arr1 = arr1.split("\n").map(function(item){
    return parseFloat(item,10)
  })

  arr2 = array2.toString()
  arr2 = arr2.split("\n").map(function(item){
    return parseFloat(item,10)
  })

  cal.results(arr1, arr2)

  console.log(cal.result1)
  console.log(cal.result2)
  res.json({ result1 : cal.result1,
             result2 : cal.result2,
             result3 : cal.result3,
             result4 : cal.result4,
   })
  // res.end()
})

app.get('/reset', function(req, res){
  //reset data and path
  array1 = ''
  array2 = ''
  path1 = ''
  path0 = ''
  // res.writeHead(301, {Location: '/'})
  res.redirect('/nodejs')
  // res.end('abc')
})

app.get('/nodejs', function(req, res){
  fs.readFile(path.join(__dirname,'view','response.html'), function(err, data){
    if(err){
      throw err;
    }
    // insert data to HTML
    data = data.toString().replace('showArray1', array1)
    data = data.toString().replace('showArray2', array2)
    res.end(data)
  })
})

app.post('/fileupload', function(req, res){
  //use Formidable parsing form data
  var form = new formidable.IncomingForm();
  form.multiples = true   //If this option is enabled, the files argument will contain arrays of files for inputs which submit multiple files
  form.parse(req, function (err, fields, files) {
    // response if no file selected
    console.log("no file selected")
    if(  files.filetoupload.name == "" ){ // user didn't upload file
      //remove temp file
      fs.unlink(files.filetoupload.path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })
      res.writeHead(301, {Location: '/nodejs'})
      res.end()
    }else{
      if (files.filetoupload.length > 2)  // user uploaded more than 2 files
      {
        //asynchronous remove user's temp files
        for( var i = 0; i < files.filetoupload.length; i++){
          fs.unlink(files.filetoupload[i].path, (err) => {
            if (err) {
              console.error(err)
              return
            }
            //file removed
          })
        }
        console.log("only select one or  two files")
        res.end("only select one or  two files")
      }else if(files.filetoupload.length == 2 ){ // user uplodaed two files
        if( array1 == '' && array2 == ''){    //if user did upload file before that
          //get temp files path
          path0 = files.filetoupload[0].path
          path1 = files.filetoupload[1].path
          //read files in parallel, use readMultipleFiles
          readMultipleFiles(new Set([
            path0,
            path1,
            ])).subscribe({
              next(result) {
                if (result.path === path0) {
                  //save user's first data to array1
                  array1 = result.contents;
                } else if (result.path === path1) {
                  //save user's first data to array2
                  array2 = result.contents;
                }
              },
              complete() {
                console.log('Successfully read all files.' + 'array1:' + array1 + '  array2: ' + array2)
                res.writeHead(301, {Location: '/nodejs'})
                res.end()
                //asynchronous remove user's two files
                fs.unlink(path0, (err) => {
                  if (err) {
                    console.error(err)
                    return
                  }
                  //file removed
                })
                fs.unlink(path1, (err) => {
                  if (err) {
                    console.error(err)
                    return
                  }
                  //file removed
                })
              }
            });
        }else { //if user already uploaded first file, and upload two files again
            //asynchronous remove user's temp files
            for( var i = 0; i < files.filetoupload.length; i++){
              fs.unlink(files.filetoupload[i].path, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
                //file removed
              })
            }
            console.log("you already have first file, please select the second file")
            res.end("you already have first file, please select the second file")
          }
        }else{ // user only uploaded one file
          if( array1 != ''){ // if use already uploaded first file
            // userfile[1] = files.filetoupload
            // path0 = userfile[0].path
            // path1 = userfile[1].path

            // console.log(userfile[0].path)
            // console.log(userfile[1].path)

            fs.readFile(files.filetoupload.path, function(err, data){
              if(err){
                throw err;
              }
              // save user's file to second array
              array2 = data
              console.log(array2)
              // res.end("calculate: "+"array1: " + array1 + 'array2: ' + array2)
              //asynchronous remove file
              fs.unlink(files.filetoupload.path, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
                //file removed
              })

              //redirect to main page
              res.writeHead(301, {Location: '/nodejs'})
              res.end()
              // res.redirect('/')
              //set array1 and array to back to empty
              // array1 = array2 = ''
            })

          }else { // if this is the first file

            console.log(files.filetoupload)
            fs.readFile(files.filetoupload.path, function(err, data){
              if(err){
                throw err;
              }
              //save user's file to array1
              array1 = data
              console.log(array1)
              res.end(data)
              //asynchronous remove files
              fs.unlink(files.filetoupload.path, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
                //file removed
              })
            })

            res.writeHead(301, {Location: '/nodejs'})
            console.log("please select the second file")
            res.end()
          }
        }
    }
});
})

app.listen(8000, function(){
  console.log('app is running at port 8000')
})
