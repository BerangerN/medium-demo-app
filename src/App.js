import './App.css'

import React, { Component } from 'react'

import axios from 'axios'

import LinearProgress from '@material-ui/core/LinearProgress'
import { Typography } from '@material-ui/core'
import { URL } from './config'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      temperature: '',
      loading: false,
    }
  }

  //Function called when the button is clicked
  getDiagnosis = async () => {
    const { temperature } = this.state

    this.setState({ loading: true, message: '' })

    const baseUrl = `${URL}${temperature}`

    try {
      const resultGetDiagnosis = await axios.get(baseUrl) //Call the Cloud Function

      if (resultGetDiagnosis.data && resultGetDiagnosis.data.status === 200) {
        this.setState({ message: resultGetDiagnosis.data.message })
      } else {
        console.log(resultGetDiagnosis)
      }
    } catch (err) {
      console.log('ERROR', err)
      this.setState({ message: 'An internal error happened.' })
    }
    this.setState({ loading: false })
  }

  //Function called when inserting a value
  handleChange = ev => {
    const { value, name } = ev.target

    if (value.match(/\d/g))
      this.setState({ [name]: value.match(/\d/g).join('') })
    else this.setState({ [name]: '' })
  }

  //When user press Enter
  handleKeyDown = ev => {
    if (ev.key === 'Enter') {
      this.getDiagnosis()
    }
  }

  render() {
    const { message, temperature, loading } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <div>
            <input
              type='text'
              name='temperature'
              value={temperature}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              placeholder='Your temperature'
              autoFocus={true}
              style={{
                textAlign: 'center',
                background: 'none',
                textTransform: 'uppercase',
                border: 0,
                borderBottom: '3px solid #52baf2',
                outline: 'none',
                color: '#ffffff',
                float: 'none',
                fontSize: '50px',
                fontWeight: '300',
                lineHeight: '1',
                padding: '5px 0',
                width: '100%',
                height: '50px',
              }}
            />

            <br />
            <br />
            {loading && (
              <LinearProgress style={{ backgroundColor: '#52baf2' }} />
            )}
            <br />
            <Typography variant='h5' gutterBottom>
              {message}
            </Typography>
          </div>
        </header>
      </div>
    )
  }
}

export default App
