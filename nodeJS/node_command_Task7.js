const fs = require('fs')

// import Calculator Model
const Cal = require('./public/js/Model.js')

// get input files paths  and output file path
const inFile1 = process.argv[2]
const inFile2 = process.argv[3]
const outFile = process.argv[4]
let dataArray1 = ''
let dataArray2 = ''
const cal = new Cal()
// read file1 first, and get Array1
fs.readFile(inFile1, 'utf8', (error, text) => {
  if (error) {
    throw error
  }
  dataArray1 = text.split('\r\n').map(function (item) {
    return parseFloat(item, 10)
  })
  // when file1 be read, read file2, and get Array2
  fs.readFile(inFile2, 'utf8', (error, text) => {
    if (error) {
      throw error
    }
    dataArray2 = text.split('\r\n').map(function (item) {
      return parseFloat(item, 10)
    })
    // print Array1 and Array2 on screen
    console.log('Array1: ' + dataArray1)
    console.log('Array2: ' + dataArray2)
    console.log('')
    // Calculate
    cal.results(dataArray1, dataArray2)
    console.log('Result of Correlation')
    console.log('Rxy = ' + cal.Rxy)
    console.log('R2 = ' + cal.R2)
    console.log('')
    console.log('Result of Regression')
    console.log('Bata1 = ' + cal.Bata1)
    console.log('Bata0 = ' + cal.Bata0)
    // Synchronously append data to a file
    try {
      fs.appendFileSync(outFile, 'array1 = ' + dataArray1 + '\r\n' + 'array2 = ' + dataArray2 + '\r\n' + '\r\n')
    } catch (err) {
      console.log(err)
    }
    try {
      fs.appendFileSync(outFile, 'Result of Correlation' + '\r\n' + 'Rxy = ' + cal.Rxy + '\r\n' + 'R2 = ' + cal.R2 + '\r\n' + '\r\n')
    } catch (err) {
      console.log(err)
    }
    try {
      fs.appendFileSync(outFile, 'Result of Regression' + '\r\n' + 'Bata1 = ' + cal.Bata1 + '\r\n' + 'Bata0 = ' + cal.Bata0 + '\r\n')
    } catch (err) {
      console.log(err)
    }

    // Can not use Asynchronously append. This will cause array incorrect order!!!
    // write file
    // write array1
    // fs.promises.appendFile(outFile, "Array1: " + dataArray1 + '\r\n')
    //   .then(() => {
    //     //when array1 be wrote, write array2
    //     fs.promises.appendFile(outFile, "Array2: " + dataArray2 + '\r\n')
    //       .then(() => {
    //         //when array1 and array2 be wrote, write result
    //         fs.promises.appendFile(outFile, "Sum: " + sum+ '\r\n')
    //           .then(() => {
    //             console.log("saved your result in: " + outFile + '\r\n')
    //           })
    //           .catch((err) => {
    //             console.log(err)
    //           })
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  })
})
