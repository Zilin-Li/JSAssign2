// CommonJS Modules, one ECMAScript 5 module systems, in Node.js
const {
  readFile,
  appendFileSync
} = require('fs')
/*
// when using fs.promises API of Node
const fs = require('fs')
const fsPromises = fs.promises
*/
const Calc = require('./public/js/Model.js')

let inFile1 = process.argv[2]
let inFile2 = process.argv[3]
let outFile = process.argv[4]

console.log("%s \r\n%s", inFile1, inFile2, outFile)

readFile(inFile1,'utf8', (error, text) => {
  if (error) {
    throw error
  }
  let dataArray1 = text.split('\r\n').map(x => Number(x))
  console.log(dataArray1)

  let sum = Calc.calcSum(dataArray)
  console.log(sum)

  for (let x of dataArray) {

    /*
    // Asynchronously append data to a file
    fsPromises.appendFile(outFile, x + '\r\n')
      .then(() => {
        console.log('added ', x)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    fsPromises.appendFile(outFile, 'sum = ' + sum + '\r\n')
      .then(() => {
        console.log('sum added ', sum)
      })
      .catch((err) => {
        console.log(err)
      })
    */



    // Synchronously append data to a file
    try {
      appendFileSync(outFile, x + '\r\n')
      console.log('added ', x)
    } catch (err) {
      console.log(err)
    }
  }

  try {
    appendFileSync(outFile, 'sum = ' + sum + '\r\n')
    console.log('sum added ', sum);
  } catch (err) {
    console.log(err)
  }
})
