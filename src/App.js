
import './App.css';

import React, { Component } from 'react'

import axios from 'axios'

const URL = 'https://us-central1-medium-76adb.cloudfunctions.net/checkTemperature?temperature='

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      temperature: ''
    }
  }

  //Function called when the button is clicked
  getDiagnosis = async () => {
    const { temperature } = this.state

    const baseUrl = `${URL}${temperature}`

    const resultGetDiagnosis = await axios.get(baseUrl) //Call the Cloud Function

    if (resultGetDiagnosis.data && resultGetDiagnosis.data.status === 200) {
      this.setState({ message: resultGetDiagnosis.data.message })
    } else {
      console.log(resultGetDiagnosis)
    }
  }

  //Function called when inserting a value
  handleChange = ev => {
    const { value, name } = ev.target
    this.setState({ [name]: value })
  }

  render() {
    const { message, temperature } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <input type="text" name='temperature' value={temperature} onChange={this.handleChange} placeholder='Your temperature' />
            <br /><br />
            <button onClick={this.getDiagnosis}>
              Get diagnosis
            </button>
            <br /><br />
            {message}
          </p>
        </header>
      </div>
    );
  }
}

export default App
