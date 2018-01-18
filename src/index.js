import React, {Component} from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CropImageUI from './cropImageUI'
import PropTypes from 'prop-types';

class AppolodoroCropImage extends Component{
  
  handleScale = (event) => {
    try{
        let ratio =  (event.target.value > 50 && event.target.value > this.lastZoom) ? 0.1 : -0.1;
        this.cropper.zoom(ratio, ratio);
        this.lastZoom = event.target.value
    }catch(error){
        console.log(error)
    }
  }

  handleCrop = () => {
    const imageCropped = this.cropper.getCroppedCanvas({
      width: 600,
      height: 315,
      minWidth: 600,
      minHeight: 315,
      maxWidth: 600,
      maxHeight: 315,
    }).toDataURL("image/jpeg", 1.0)
    this.props.onCrop(imageCropped)
  }

  handleCancel = () => {
    (this.props.onCancel) && this.props.onCancel() 
  }

  handleSetRef = (element) => {
    this.cropper = element
  }

  render() {
    return <div>
      <CropImageUI 
      setRef = { this.handleSetRef }
      scale = { this.handleScale }
      crop = { this.handleCrop }
      cancel = { this.handleCancel }
      image = { this.props.image }
      />
    </div>
  }
}

AppolodoroCropImage.propTypes = {
  image : PropTypes.string.isRequired,
  onCrop : PropTypes.func.isRequired,
  onCancel : PropTypes.func
};

AppolodoroCropImage.defaultProps = {

};

export default AppolodoroCropImage;
