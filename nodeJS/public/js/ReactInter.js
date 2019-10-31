class FileInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Rxy:"",
      R2:"",
      Bata1:"",
      Bata0:"",
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
    this.calculator = new Calculator()
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
          return parseFloat(item,10)
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
      Rxy:"",
      R2:"",
      Bata1:"",
      Bata0:"",
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
        Rxy: this.calculator.Rxy,
        R2: this.calculator.R2,
        Bata1: this.calculator.Bata1,
        Bata0: this.calculator.Bata0,
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
            <p>Array1:[ {this.state.array1.toString()} ]</p>
            <p>Array2:[ {this.state.array2.toString()} ]</p>
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
              <td>R<sub>xy</sub> = {this.state.Rxy} </td>
              <td>&beta;<sub>0</sub> = {this.state.Bata0}</td>
            </tr>
            <tr>
              <td>R<sup>2</sup> = {this.state.R2}</td>
              <td>&beta;<sub>1</sub> = {this.state.Bata1}</td>
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
