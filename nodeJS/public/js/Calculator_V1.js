class Calculator{
    sumOfProduct(a,b){
      var n
      var sum1 = 0

      if (a.length >= b.length){
        n = b.length
      }
      else{
        n = a.length
      }
      for(var i=0; i<n;i++){
        sum1 += a[i]*b[i]
      }
      return sum1
    }
    sumOfArray(c){
      var sum2=0
      for(var i=0; i< c.length;i++){
        sum2 += c[i]
      }
      return sum2
    }
    sumOfSquared(d){
      var sum3=0
      for(var i=0; i< d.length;i++){
        sum3 += Math.pow(d[i], 2)
      }
      return sum3
    }
    avgOfArray(e){
      var avg
      avg = this.sumOfArray(e)/e.length

      return avg
    }
    calNumerator(a,b){
      var nume
      nume = a.length*this.sumOfProduct(a,b)-this.sumOfArray(a)*this.sumOfArray(b)
      return nume
    }
    calDenominator(a,b){
      var denoP1
      var denoP2
      var deno
      denoP1= a.length*this.sumOfSquared(a)-Math.pow(this.sumOfArray(a), 2)
      denoP2= b.length*this.sumOfSquared(b)-Math.pow(this.sumOfArray(b), 2)
      deno = Math.sqrt(denoP1*denoP2)
      return deno
    }
    regNumerator(a,b){
      var numeP1 = this.sumOfProduct(a,b);
      var numeP2 = a.length*this.avgOfArray(a)*this.avgOfArray(b)

      var nume = numeP1 - numeP2
      return nume
    }
    regDenominator(a){
      var deno = this.sumOfSquared(a) - a.length * Math.pow(this.avgOfArray(a),2)
      //console.log(a.length * Math.pow(this.avgOfArray(a),2))
      console.log(this.avgOfArray(a))
      return deno
    }

    results(array1, array2){
      var s =this.calNumerator(array1,array2)/this.calDenominator(array1,array2)
      this.result1 = s
      this.result2 = Math.pow(s,2)
      var h = this.regNumerator(array1,array2)/this.regDenominator(array1)
      console.log("cal"+this.regDenominator(array1))
      this.result3 = h
      this.result4 = this.avgOfArray(array2) - h* this.avgOfArray(array1)
    }
}
