var cor = new Vue({
  el:'#app1',
  data:{
    result1:"",
    result2:"",
    result3:"",
    result4:"",

    // array1:[83,116,186,81,114],
    // array2:[11.2,9.3,21.6,6.9,10.2],
    array3:[130,650,99,150,128,302,95,945,368,961],
    array4:[186,699,132,272,291,331,199,1890,788,1601],

    content: '',
    array1:[],
    array2:[],

},

  methods:{

    onFileChange(e) {
      let files = e.target.files
      if (files.length = 2) {
        this.loadNumbers(files)
      }
    },

    loadNumbers(file) {
      let reader1 = new FileReader()
      let reader2 = new FileReader()
      reader1.onload = (e) => {
        this.content = e.target.result
        this.array1 = this.content.split("\n").map(function(item) {
            return parseInt(item, 10);
          });

      }
      reader2.onload = (e) => {
        this.content = e.target.result
        this.array2 = this.content.split("\n").map(function(item) {
            return parseInt(item, 10);
          });
      }
      reader1.readAsText(file[0])
      reader2.readAsText(file[1])
    },

    //这一部分是数学运算，两个算式共用。稍后是一个独立的class。
    //summation of X(i)*Y(i).
    sumOfProduct(a,b){
      var n;
      var sum1 = 0;

      if (a.length >= b.length){
        n = b.length;
      }
      else{
        n = a.length;
      }
      for(var i=0; i<n;i++){
        sum1 += a[i]*b[i];
      //  console.log("X("+i+")+Y("+i+")="+sum1);
      }
      return sum1;
    },

  //summation of X(i)orY(i).
    sumOfArray(c){
      var sum2=0;
      for(var i=0; i< c.length;i++){
        sum2 += c[i];
      }
      return sum2;
    },

    sumOfSquared(d){
      var sum3=0;
      for(var i=0; i< d.length;i++){
        sum3 += Math.pow(d[i], 2);
      }
      return sum3;

    },

    avgOfArray(e){
      var avg;
      avg = this.sumOfArray(e)/e.length;
      return avg;

    },

    calNumerator(a,b){
      var nume;
      nume = a.length*this.sumOfProduct(a,b)-this.sumOfArray(a)*this.sumOfArray(b);
      return nume;
    },

    calDenominator(a,b){
      var denoP1;
      var denoP2;
      var deno;
      denoP1= a.length*this.sumOfSquared(a)-Math.pow(this.sumOfArray(a), 2);
      denoP2= b.length*this.sumOfSquared(b)-Math.pow(this.sumOfArray(b), 2);
      deno = Math.sqrt(denoP1*denoP2);
      return deno;
    },

    regNumerator(a,b){

      var numeP1 = this.sumOfProduct(a,b);
      var numeP2 = a.length*this.avgOfArray(a)*this.avgOfArray(b)
      var nume = numeP1 - numeP2;
      return nume
    },

    regDenominator(a){
      var deno = this.sumOfSquared(a) - a.length * Math.pow(this.avgOfArray(a),2)
      return deno;
    },






    //这一部分是correlation算式。
    cal(){
      var s =this.calNumerator(this.array1,this.array2)/this.calDenominator(this.array1,this.array2);
      this.result1 = s;
      this.result2 = Math.pow(s,2);
      //this.result1 = this.array1[0];
    },

    reg(){
      var h = this.regNumerator(this.array3,this.array4)/this.regDenominator(this.array3);
      this.result3 = h;
      this.result4 = this.avgOfArray(this.array4) - h* this.avgOfArray(this.array3);

    }


  },

});
