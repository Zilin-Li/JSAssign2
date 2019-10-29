// const http = require('http')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const express = require('express')
const readMultipleFiles = require('read-multiple-files')
const Calculator2 = require('./public/js/ModelNode.js')

// import {Calculator2} from "./public/js/Model.js";
let cal = new Calculator2()

const app = express()
//是否可以用express
let userStr1 = ''
let userStr2 = ''
let array1 = ''
let array2 = ''
let path1 = ''
let path0 = ''

//expose static resources folder
//no need check path
app.use('/public/', express.static('./public/'))


//nodejs Interface, return vue and react view.
//client use 'get' method to request root path
//server response by reading index.html and return to client.
//if client request a invaild path, express response "Cannot GET /"
app.get('/', function(req, res){
  fs.readFile(path.join(__dirname,'view','index.html'), function(err, data){
    if(err){
      throw err;
    }
    //return data(index.html) to client
    res.end(data)
  })
})

//receive client upload files.
app.post('/fileupload', function(req, res){
  //use Formidable parsing form data
  let form = new formidable.IncomingForm();
  //form.multiples = true, allow client to upload more than one file.
  //the files argument will contain arrays of files for inputs which submit multiple files
  form.multiples = true
  form.parse(req, function (err, fields, files) {
  // response if no file selected
    if(  files.filetoupload.name == "" ){
      //remove temp file
      fs.unlink(files.filetoupload.path, (err) => {
        if (err) {
          console.error(err)
          return
        }
      //file removed
      })
      res.writeHead(301, {Location: '/'})
      res.end()
    }

    else{
      if (files.filetoupload.length > 2)
      {
        // user uploaded more than 2 files
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
      }
      else if(files.filetoupload.length == 2 ){
        // user uplodaed two files
        if( userStr1== '' && userStr2 == ''){
          //if user did not upload file before that
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
                  userStr1= result.contents;
                }
                else if (result.path === path1) {
                  //save user's first data to userStr2
                  userStr2 = result.contents;
                }
              },
              //when the files have been read.
              complete() {
                // res.writeHead(301, {Location: '/'})
                // res.end()
                res.json({ a1 : userStr1.toString(),
                           a2 : userStr2.toString(),
                 })
              //asynchronous remove user's two files
                fs.unlink(path0, (err) => {
                  if (err) {
                    console.error(err)
                    return
                  }
                  //file1 removed
                })
                fs.unlink(path1, (err) => {
                  if (err) {
                    console.error(err)
                    return
                  }
                  //file2 removed
                })
              }
            });
        }
        //if user already uploaded first file, and upload two files again
        //asynchronous remove user's temp files
        else {
            for( let i = 0; i < files.filetoupload.length; i++){
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
        }
      else { // user only uploaded one file
          if( userStr1!= ''){
            // if use already uploaded first file
            fs.readFile(files.filetoupload.path, function(err, data){
              if(err){
                throw err;
              }
              // save user's file to second array
              userStr2 = data
              console.log(userStr2)
              //asynchronous remove file
              fs.unlink(files.filetoupload.path, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
                //file removed
              })
              //redirect to main page
              res.writeHead(301, {Location: '/'})
              res.end()
            })
          }
          else {
            // if this is the first file
            fs.readFile(files.filetoupload.path, function(err, data){
              if(err){
                throw err;
              }
              //save user's file to array1
              userStr1= data
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
            res.writeHead(301, {Location: '/'})
            console.log("please select the second file")
            res.end()
          }
        }
      }
    });

})

app.get('/reset', function(req, res){
  //reset data and path
  userStr1= ''
  userStr2 = ''
  path1 = ''
  path0 = ''
  res.redirect('/')
})

app.get('/cal', function(req, res){
  console.log(array1)
  array1 = userStr1.toString()
  array1 = array1.split("\n").map(function(item){
    return parseFloat(item,10)
  })

  array2 = userStr2.toString()
  array2 = array2.split("\n").map(function(item){
    return parseFloat(item,10)
  })

  cal.results(array1, array2)

  console.log("Result of Correlation")
  console.log("Rxy = "+ cal.Rxy)
  console.log("R2 = "+ cal.R2)
  console.log("")
  console.log("Result of Regression")
  console.log("Bata1 = "+cal.Bata1)
  console.log("Bata0 = "+cal.Bata0)

  res.json({ Rxy : cal.Rxy,
             R2 : cal.R2,
             Bata1 : cal.Bata1,
             Bata0 : cal.Bata0,
   })
  // res.end()
})


app.listen(8080, function(){
  console.log('app is running at port 8080')
})
