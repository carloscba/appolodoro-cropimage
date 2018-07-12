# appolodoro-cropimage

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

```js
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
  
  render = () => {
    return <div>
      <h1>appolodoro-cropimage Demo</h1>
      <AppolodoroImageCrop
        onCrop = { this.handleCrop }
        onCancel = { this.handleCancel }
        image = { testImage }
        size = {[600,315]}
        //Optional
        smartcrop = {
          {
            key : ''
          }
        }
        
      />

      <img src={ this.state.image } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))

```
