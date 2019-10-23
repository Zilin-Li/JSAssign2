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
    calculator: new Calculator()
},

  methods:{
    onFileChange(e) {
      let files = e.target.files
      if (files.length == 2) {
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
     calResult(){
       this.calculator.cal(this.array1, this.array2)
       this.result1 = this.calculator.result1
       this.result2 = this.calculator.result2
     },
     regResult(){
       this.calculator.reg(this.array1, this.array2)
       this.result3 = this.calculator.result3
       this.result4 = this.calculator.result4
     }
  },
});
