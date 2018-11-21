import React, {Component} from 'react'
import {render} from 'react-dom'
import testImage from './locro.jpg'

import AppolodoroImageCrop from '../../src'

class Demo extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      image : null
    }
  }

  handleCrop = (imageData) => {
    this.setState({
      image : imageData
    })
  }
  handleCancel = () => {
    console.log('Cancel')
  }
  handleStart = () => {
    console.log('handleStart')
  }
  handleError = (error) => {
    console.log('error', error)
  }
  
  render = () => {
    return <div>
      <h1>appolodoro-cropimage Demo</h1>
      <AppolodoroImageCrop
        onStart = { this.handleStart } 
        onCrop = { this.handleCrop }
        onError = { this.handleError }
        onCancel = { this.handleCancel }
        image = { testImage }
        size = {[600,315]}
        //Optional
        smartcrop = {
          {
            key : 'AIzaSyBSeJfCWZMYdAfC_LTn3OGtnp4NhRtQBHQ'
          }
        }
        
      />

      <img src={ this.state.image } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
