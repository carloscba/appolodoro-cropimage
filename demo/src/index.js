import React, {Component} from 'react'
import {render} from 'react-dom'
import testImage from './limbo.jpg'

import AppolodoroImageCrop from '../../src'

class Demo extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      image : null
    }
  }

  handleCrop = (imageData) => {
    console.log(imageData)
    this.setState({
      image : imageData
    })
  }
  handleCancel = () => {
    console.log('Cancel')
  }
  
  render = () => {
    return <div>
      <h1>appolodoro-cropimage Demo</h1>
      <AppolodoroImageCrop
        onCrop = { this.handleCrop }
        onCancel = { this.handleCancel }
        image = { testImage }
      />

      <img src={ this.state.image } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
