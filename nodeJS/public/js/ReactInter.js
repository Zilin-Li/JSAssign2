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
      array_display:'none',
      error_display:'none',
      errorMessage:"The number of files is out of range. Please choose two files.",
    }
    this.onFileChange = this.onFileChange.bind(this)
    this.getResults = this.getResults.bind(this)
    this.calculator = new Calculator()
  }
  onFileChange (e) {
    this.setState({
      array1:[],
      array2:[],
    })
    let files = e.target.files
    if (files.length ==2) {
      this.loadNumbers(files)
      this.setState({
        array_display: 'block',
        error_display:'none',
      })
    }
    else{
      this.setState({
        array_display: 'none',
        error_display:'block',
      })
    }
  }
  loadNumbers (file) {
    let reader1 = new FileReader()
    let reader2 = new FileReader()
    reader1.onload = (e) => {
    this.state.content = e.target.result
    this.setState({
      array1:this.state.content.split("\n").map(function(item) {
            return parseInt(item, 10);
          })
        })
    }
    reader2.onload = (e) => {
    this.state.content = e.target.result

    this.setState({
      array2:this.state.content.split("\n").map(function(item) {
            return parseInt(item, 10);
          })
        })
    }
    reader1.readAsText(file[0])
    reader2.readAsText(file[1])
  }
  getResults(){
    this.calculator.results(this.state.array1,this.state.array2)
    this.setState({
        result1: this.calculator.result1,
        result2:  this.calculator.result2,
        result3: this.calculator.result3,
        result4:  this.calculator.result4,
    })
  }
  render () {
    return (
      <div>
        <h1 className="navbar bg-dark navbar-dark title ">ReactJs Interface</h1>
        <div className="jumbotron enterFile" >
          <input type='file' className="form-control-file border" data-toggle="tooltip" data-placement="bottom" title="Please choose two files." onChange={this.onFileChange} multiple/>
          <br/>
          <div style={{display: this.state.array_display}}>
            <p>Array1:{this.state.array1}</p>
            <p>Array2:{this.state.array2}</p>
          </div>
          <div style={{display: this.state.error_display}}>{this.state.errorMessage}</div>
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
      </div>
    )
  }
}
const element = <FileInput />
ReactDOM.render(
  element,
  document.getElementById('app2')
)
