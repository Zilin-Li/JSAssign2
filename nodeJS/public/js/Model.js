class Calculator{
  //This function put all X(i)*Y(i) results in an array.
  products(array1,array2){
    let products = []
    let lengthOfArray
    if (array1.length >= array2.length){
        lengthOfArray = array2.length
      }
      else{
        lengthOfArray = array1.length
      }
      for(let i=0; i<lengthOfArray; i++){
        products.push(array1[i]*array2[i])
      }
      return products
  }

  //This function get a sum of an array.
  sumOfArray(array){
    let sum = 0
    for(let i = 0; i< array.length; i++){
      sum += array[i]
    }
    return sum
  }

  //This function get a average value of an array.
  avgOfArray(array){
    let avg
    avg = this.sumOfArray(array)/array.length
    return avg
  }

  //To reduce the code, this function means: arrayLength*sumOfArray
  lengthMultiSum(arrayLength, sum){
    let product
    product = arrayLength.length * sum
    return product
  }

  //To reduce the code, this function means: arrayLength*averageOfArray1*averageOfArray2
  lengthMultiAvg(array1,array2){
    let product3
    let lengthOfArray
    if (array1.length >= array2.length){
        lengthOfArray = array2.length
      }
      else{
        lengthOfArray = array1.length
      }
    product3 = lengthOfArray*this.avgOfArray(array1)*this.avgOfArray(array2)
    return product3
  }

  //This function means: sumOfArray1*sumOfArray2
  sumMultiSum(array1,array2){
    let product2
    product2 = this.sumOfArray(array1)*this.sumOfArray(array2)
    return product2
  }

  //This function use to reduce the code
  subtraction1(a,b){
    let difference
    difference = this.lengthMultiSum(a,this.sumOfArray(this.products(a,b)))-this.sumOfArray(a)*this.sumOfArray(b)
    return difference
  }

  //This function use to reduce the code
  subtraction2(a,b){
    let difference2
    difference2 = this.sumOfArray(this.products(a,b)) - this.lengthMultiAvg(a,b)
    return difference2
  }

  //
  results(a, b){
    //Part of Correlation
    let s =this.subtraction1(a,b)/Math.sqrt(this.subtraction1(a,a)*this.subtraction1(b,b))
    this.Rxy = s
    this.R2 = Math.pow(s,2)

    //Part of Regression
    let h = this.subtraction2(a,b)/this.subtraction2(a,a)
    this.Bata1 = h
    this.Bata0 = this.avgOfArray(b) - h* this.avgOfArray(a)
  }
}
