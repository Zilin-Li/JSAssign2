class FileInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      result1:"",
      result2:"",
      result3:"",
      result4:"",
      content:'',
      array1:[],
      array2:[],
      arrayInfo:'none',
      errorMess:'none',
      errorMessage:"",
    }
    this.onFileChange = this.onFileChange.bind(this)
    this.getResults = this.getResults.bind(this)
    this.resetFile = this.resetFile.bind(this)
    this.calculator = new Calculator2()
  }
  onFileChange (e) {
    let files = e.target.files
    this.setState({
      arrayInfo:'none',
      errorMess:'none',
      errorMessage:"",
    })

    if(files.length > 2){
      // if user uploaded more than two files
      //tell user upload one or two files.

      this.setState({
        arrayInfo:'block',
        errorMess:'block',
        errorMessage:"The number of files is out of range. Please choose one or two files.",
      })
    }
    else if(files.length == 2){
      if(this.state.array1 == '' && this.state.array2 == '' ){
        //if user did not upload file before
        this.loadNumbers(files, 0)
        this.setState({
          arrayInfo:'block',
          errorMess:'none',
        })

      }
      else if(this.state.array1 != '' && this.state.array2 == '' ){
        //if user already uploaded one file before
        //tell user upload only one file.
        this.setState({
          arrayInfo:'block',
          errorMess:'block',
          errorMessage:"The number of files is out of range. Please choose one files.",
        })
      }
      else{
        //if user have uploaded two files before
        this.setState({
          arrayInfo:'block',
          errorMess:'block',
          errorMessage:"You have already chose two files. Click reset to recalculate.",
        })
      }
    }
    else{//use upload one file
      if(this.state.array1 == ''){
        //the frist array is empty
        //read file and put the value to first array
        this.loadNumbers(files, 0)
        this.setState({
          arrayInfo :'block'
        })
      }
      else if(this.state.array1 != ''){
        //the frist array is not empty
        if(this.state.array2 == ''){
          //if the second array is empty
          //read file and put the value to second array
          this.loadNumbers(files,1)
          this.setState({
            arrayInfo :'block'
          })
        }
        else{
          //if the second array is not empty
          //tell user to reset
          this.setState({
            errorMess:'block',
            arrayInfo :'block',
            errorMessage:"You have already chose two files. Click reset to recalculate2."
          })
        }
      }
    }
  }
  loadNumbers (files, offset) {
    let reader = []
    for(let i = 0; i<files.length; i++){
      reader[i]= new FileReader()
      reader[i].onload = (e) =>{
        this.state.content = e.target.result
        let getArray = this.state.content.split("\n").map(function(item){
          return parseInt(item,10)
        })
        //this.numberArray[i+offset] = getArray
        if(i == 0 && offset ==0){
          this.setState({
            array1:getArray
          })
        }
        else {
          this.setState({
            array2:getArray
          })
        }
      }
      reader[i].readAsText(files[i])
    }
  }

  resetFile(){
    this.setState({
      result1:"",
      result2:"",
      result3:"",
      result4:"",
      array1:[],
      array2:[],
      arrayInfo:'none',
      errorMess:'none',
      errorMessage:"",
    })
    document.getElementById("input2").value = "";
  }
  getResults(){
    this.calculator.results(this.state.array1,this.state.array2)
    this.setState({
        result1: this.calculator.result1,
        result2: this.calculator.result2,
        result3: this.calculator.result3,
        result4: this.calculator.result4,
    })
  }
  render () {
    return (
      <div>
        <h1 className="navbar bg-dark navbar-dark title ">ReactJs Interface</h1>
        <div className="jumbotron enterFile" >
          <input type='file' id="input2" className="form-control-file border" data-toggle="tooltip" data-placement="bottom" title="Please choose two files." onChange={this.onFileChange} multiple/>
          <br/>
          <div style={{display: this.state.arrayInfo}}>
            <p>Array1:{this.state.array1}</p>
            <p>Array2:{this.state.array2}</p>
          </div>
          <div style={{display: this.state.errorMess}}>{this.state.errorMessage}</div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Result of Correlation</th>
              <th>Result of Regression</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R<sub>xy</sub> = {this.state.result1} </td>
              <td>&beta;<sub>0</sub> = {this.state.result3}</td>
            </tr>
            <tr>
              <td>R<sup>2</sup> = {this.state.result2}</td>
              <td>&beta;<sub>1</sub> = {this.state.result4}</td>
            </tr>
          </tbody>
        </table>
        <button  className="btn btn-primary" onClick={this.getResults}>
          Calculation Results
        </button>
        <button  className="btn btn-primary reset" onClick={this.resetFile}>
          Reset
        </button>
      </div>
    )
  }
}
const element = <FileInput />
ReactDOM.render(
  element,
  document.getElementById('app2')
)
