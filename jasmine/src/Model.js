class Calculator2{
  products(a,b){
    let products = []
    let lengthOfArray
    if (a.length >= b.length){
        lengthOfArray = b.length
      }
      else{
        lengthOfArray = a.length
      }
      for(let i=0; i<lengthOfArray; i++){
        products.push(a[i]*b[i])
      }
      return products
  }
  sumOfArray(a){
    let sum = 0
    for(let i = 0; i< a.length; i++){
      sum += a[i]
    }
    return sum
  }
  avgOfArray(a){
    let avg
    avg = this.sumOfArray(a)/a.length
    return avg
  }
  lengthMultiSum(a, sum){
    let product
    product = a.length * sum
    return product
  }
  //
  lengthMultiAvg(a,b){
    let product3
    let lengthOfArray
    if (a.length >= b.length){
        lengthOfArray = b.length
      }
      else{
        lengthOfArray = a.length
      }
    product3 = lengthOfArray*this.avgOfArray(a)*this.avgOfArray(b)
    return product3
  }
  //
  sumMultiSum(a,b){
    let product2
    product2 = this.sumOfArray(a)*this.sumOfArray(b)
    return product2
  }
  //
  subtraction1(a,b){
    let difference
    difference = this.lengthMultiSum(a,this.sumOfArray(this.products(a,b)))-this.sumOfArray(a)*this.sumOfArray(b)
    return difference
  }
  //
  subtraction2(a,b){
    let difference2
    difference2 = this.sumOfArray(this.products(a,b)) - this.lengthMultiAvg(a,b)
    console.log(this.lengthMultiAvg(a,b))
    return difference2
  }
    results(a, b){
      //
      var s =this.subtraction1(a,b)/Math.sqrt(this.subtraction1(a,a)*this.subtraction1(b,b))
      this.result1 = s
      this.result2 = Math.pow(s,2)
      //
      var h = this.subtraction2(a,b)/this.subtraction2(a,a)
      console.log("model"+this.subtraction2(a,a))
      this.result3 = h
      this.result4 = this.avgOfArray(b) - h* this.avgOfArray(a)
    }
}
