import React from 'react';
import Cropper from 'react-cropper';

const CropImageUI = (props) => (
    <div className="CropImage">
        <Cropper
        ref={ props.setRef }
        src= { props.image }
        dragMode = 'move'
        aspectRatio={600 / 315}
        guides={false}
        modal = {true}
        background = {false}
        cropBoxResizable = {false}
        cropBoxMovable = {false}
        viewMode = { 1 }
        toggleDragModeOnDblclick = { false }
        zoomOnTouch = { false }
        zoomOnWheel = { false }
        />
        <div>
            <input onChange = { props.scale } type="range" min="0" max="100" defaultValue="50" className="CropImage__slider" />
            <button className='CropImage__btnCancel' onClick={props.cancel}>Cancel</button>
            <button className='CropImage__btnCrop' onClick={props.crop}>Crop</button>   
        </div>
    </div>
)

export default CropImageUI;