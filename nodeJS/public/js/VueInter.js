var cor = new Vue({
  el:'#app1',
  data:{
    result1:"",
    result2:"",
    result3:"",
    result4:"",
    content:'',
    array1:[],
    array2:[],
    arrayInfo:false,
    errorMess:false,
    errorMessage:"The number of files is out of range. Please choose two files.",

    calculator: new Calculator()
},
  methods:{
    onFileChange(e) {
      this.arrayInfo=false
      this.errorMess=false
      this.array1 = []
      this.array2 =[]
      let files = e.target.files
      if (files.length == 2) {
        this.loadNumbers(files)
        this.arrayInfo = true
      }
      else{
        this.errorMess = true
      }
    },
    loadNumbers(file) {
      let reader1 = new FileReader()
      let reader2 = new FileReader()
      reader1.onload = (e) => {
        this.content = e.target.result
        this.array1 = this.content.split("\n").map(function(item) {
            return parseInt(item, 10)
          });
      }
      reader2.onload = (e) => {
        this.content = e.target.result
        this.array2 = this.content.split("\n").map(function(item) {
            return parseInt(item, 10)
          });
      }
      reader1.readAsText(file[0])
      reader2.readAsText(file[1])
    },
     getResults(){
       this.calculator.results(this.array1, this.array2)
       this.result1 = this.calculator.result1
       this.result2 = this.calculator.result2
       this.result3 = this.calculator.result3
       this.result4 = this.calculator.result4
     }
  },
});
