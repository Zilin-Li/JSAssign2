var cor = new Vue({
  el:'#app1',
  data:{
    abc:[],
    Rxy:"",
    R2:"",
    Bata1:"",
    Bata0:"",
    content:'',
    array1:[],
    array2:[],
    arrayInfo:false,
    errorMess:false,
    errorMessage:"",

  //  calculator: new Calculator()
    calculator: new Calculator2()
},
  methods:{
    onFileChange(e) {
      let files = e.target.files
      this.arrayInfo=false
      this.errorMess=false

      if(files.length > 2){
        // if user uploaded more than two files
        //tell user upload one or two files.
        this.errorMessage="The number of files is out of range. Please choose one or two files."
        this.errorMess = true
        this.arrayInfo = true
      }
      else if(files.length == 2){
        if(this.array1 == '' && this.array2 == '' ){
          //if user did not upload file before
          this.loadNumbers(files, 0)
          this.arrayInfo = true
        }
        else if(this.array1 != '' && this.array2 == '' ){
          //if user already uploaded one file before
          //tell user upload only one file.
          this.errorMessage="The number of files is out of range. Please choose one files."
          this.errorMess = true
          this.arrayInfo = true
        }
        else{
          //if user have uploaded two files before
          this.errorMessage="You have already chose two files. Click reset to recalculate."
          this.errorMess = true
          this.arrayInfo = true
        }
      }
      else{//use upload one file
        if(this.array1 == ''){
          //the frist array is empty
          //read file and put the value to first array
          this.loadNumbers(files, 0)
          this.arrayInfo = true
        }
        else if(this.array1 != ''){
          //the frist array is not empty
          if(this.array2 == ''){
            //if the second array is empty
            //read file and put the value to second array
            this.loadNumbers(files,1)
            this.arrayInfo = true
          }
          else{
            //if the second array is not empty
            //tell user to reset
            this.errorMessage="You have already chose two files. Click reset to recalculate2."
            this.errorMess = true
            this.arrayInfo = true
          }
        }
      }
    },
    loadNumbers(files, offset) {
      let reader = []
      for(let i = 0; i<files.length; i++){
        reader[i]= new FileReader()
        reader[i].onload = (e) =>{
          this.content = e.target.result
          let getArray = this.content.split("\n").map(function(item){
            return parseFloat(item,10)
          })
          //this.numberArray[i+offset] = getArray
          if(i == 0 && offset ==0){

            this.array1= getArray
          }
          else {
            this.array2= getArray
          }
        }
        reader[i].readAsText(files[i])
      }
    },
    resetFile(){
      this.array1=''
      this.array2=''
      this.arrayInfo=false
      this.errorMess=false
      this.Rxy = ''
      this.R2 = ''
      this.Bata1 = ''
      this.Bata0 = ''
      document.getElementById("input1").value = ""
    },
    getResults(){
       this.calculator.results(this.array1, this.array2)
       this.Rxy = this.calculator.Rxy
       this.R2 = this.calculator.R2
       this.Bata1 = this.calculator.Bata1
       this.Bata0 = this.calculator.Bata0
     }
  },
});
