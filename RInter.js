<script type="text/babel">
class FileInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {content: ''}

    this.onFileChange = this.onFileChange.bind(this)
  }

  onFileChange (e) {
    let files = e.target.files
    if (files.length) {
      this.loadNumbers(files[0])
    }
  }

  loadNumbers (file) {

    let reader = new window.FileReader()

    reader.onload = (e) => {
      this.setState({content: e.target.result})
    }

    reader.readAsText(file)
  }

  render () {
    return (
      <div>
        <h2>Select a text file</h2>
        <input type='file' onChange={this.onFileChange} multiple/>
        <br />
        <br />
        {this.state.content}
      </div>
    )
  }
}

const element = <FileInput />

ReactDOM.render(
  element,
  document.getElementById('root')
)
</script>
