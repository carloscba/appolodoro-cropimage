import React, { Component } from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CropImageUI from './cropImageUI'
import PropTypes from 'prop-types';
import axios from 'axios';

class AppolodoroCropImage extends Component {

  handleScale = (event) => {
    try {
      let ratio = (event.target.value > 50 && event.target.value > this.lastZoom) ? 0.1 : -0.1;
      this.cropper.zoom(ratio, ratio);
      this.lastZoom = event.target.value
    } catch (error) {
      console.log(error)
    }
  }

  handleCrop = () => {
    const imageCropped = this.cropper.getCroppedCanvas({
      width: this.props.size[0],
      height: this.props.size[1],
      minWidth: this.props.size[0],
      minHeight: this.props.size[1],
      maxWidth: this.props.size[0],
      maxHeight: this.props.size[1],
    }).toDataURL("image/jpeg", 1.0)

    this.props.onCrop(imageCropped)
  }

  handleCancel = () => {
    (this.props.onCancel) && this.props.onCancel()
  }

  handleSetRef = (element) => {
    this.cropper = element
  }

  setImage(image, key){
    const canvasSource = this.refs.canvasSource;
    const canvasSourceContext = canvasSource.getContext('2d');

    const base_image = new Image();
    base_image.src = image;
    base_image.onload = () => {
      canvasSource.width = base_image.width
      canvasSource.height = base_image.height
      canvasSourceContext.drawImage(base_image, 0, 0);

      this.requestVision(canvasSource, canvasSource.toDataURL("image/jpeg", 1), key);
    }    
  }

  requestVision(canvasSource, image, key) {

    const requestData = {
      "requests": [
        {
          "image": {
            "content": `${image.split(',')[1]}`
          },
          "features": [
            {
              "type": "CROP_HINTS",
            }
          ],
          "imageContext": {
            "cropHintsParams": {
              "aspectRatios": [1.9]
            }
          }
        }
      ]
    }

    axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${key}`,
      requestData
    ).then((response) => {
      this.smartcrop(canvasSource, response)
    }).catch((error) => {
      console.log(error)
    });
  }

  smartcrop = (canvasSource, visionResponse) => {
    const HORIZONTAL = 'horizontal'
    const VERTICAL = 'vertical'

    const visionData = visionResponse.data.responses
    const vertices = visionData[0].cropHintsAnnotation.cropHints[0].boundingPoly.vertices

    let direction = null
    if (vertices[0].x) {
      direction = HORIZONTAL
    }
    if (vertices[0].y) {
      direction = VERTICAL
    }

    const cropSource = canvasSource.getContext('2d');
    let cropData;

    switch (direction) {
      case HORIZONTAL:
        cropData = cropSource.getImageData(vertices[0].x, 0, (vertices[1].x - vertices[0].x), vertices[2].y)
        break
      case VERTICAL:
        cropData = cropSource.getImageData(0, vertices[0].y, vertices[1].x, (vertices[3].y - vertices[0].y))
        break
      default:
        cropData = cropSource.getImageData((canvasSource.width/4), (canvasSource.height/4), this.props.size[0], this.props.size[1])
        break
    }

    const canvasResult = this.refs.canvasResult
    canvasResult.width = cropData.width
    canvasResult.height = cropData.height

    const cropResult = canvasResult.getContext("2d");
    cropResult.putImageData(cropData, 0, 0);
    cropResult.width = this.props.size[0];
    cropResult.height = this.props.size[1];

    this.props.onCrop(cropResult.canvas.toDataURL("image/jpeg", 1))

  }

  render() {

    if(this.props.smartcrop){
      return <div>
        <canvas ref="canvasSource" style={{ display: 'none'}}></canvas>
        <canvas ref="canvasResult" style={{ display: 'none'}}></canvas>
      </div>
    }else{
      return <div>
      <CropImageUI
        setRef={this.handleSetRef}
        scale={this.handleScale}
        crop={this.handleCrop}
        cancel={this.handleCancel}
        image={this.props.image}
        size = { this.props.size}
      />
    </div>
    }
  }

  componentDidMount(){
    if(this.props.smartcrop){
      this.setImage(this.props.image, this.props.smartcrop.key);
    }
  }
}



AppolodoroCropImage.propTypes = {
  image: PropTypes.string.isRequired,
  onCrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  smartcrop: PropTypes.object,
  size: PropTypes.array.isRequired
};

AppolodoroCropImage.defaultProps = {

};

export default AppolodoroCropImage;
