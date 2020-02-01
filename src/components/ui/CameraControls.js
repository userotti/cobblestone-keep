import React from 'react'
import styled from 'styled-components'
import useStore from '../../store'

const CameraControls = function({controlsColor, controlsBackgroundColor }){

  const {
    cameraSize,
    increaseCameraSize,
    rotateCamera,
    cameraOrthographicAngle,
    cameraTiltValues,
    cameraTiltIndex,
    tiltCamera
  } = useStore(state => state.camera);
  
  const {
    muteSwitch,
    muted
  } = useStore(state => state.game);

  return (<CameraControlsContainer className="camera-controls" controlsBackgroundColor={controlsBackgroundColor}>
   
    <IconButton onClick={()=>{increaseCameraSize(-1)}}>
      <img src="../icons/zoom-in-32x32.png" alt="zoom-out"/>
    </IconButton>
    <span className='value'>
      { cameraSize.toFixed(2) }
    </span>
    <IconButton onClick={()=>{increaseCameraSize(1)}}>
      <img src="../icons/zoom-out-32x32.png" alt="zoom-out"/>
    </IconButton>
    <IconButton onClick={()=>{rotateCamera(Math.PI/8)}}>
      <img src="../icons/rotate-left-32x32.png" alt="zoom-in"/>
    </IconButton>
    <span className='value'>
      { cameraOrthographicAngle.toFixed(2) }
    </span>
    <IconButton onClick={()=>{rotateCamera(-Math.PI/8)}}>
      <img src="../icons/rotate-right-32x32.png" alt="zoom-out"/>
    </IconButton>
    <IconButton onClick={()=>{tiltCamera()}}>
      TILT
    </IconButton>
    <span className='value'>
      { cameraTiltValues[cameraTiltIndex] }
    </span>
    <IconButton onClick={()=>{muteSwitch()}}>
      {muted ? 'UNMUTE' : 'MUTE'}
    </IconButton>
  </CameraControlsContainer>)
}

const CameraControlsContainer = styled.div`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 4px 4px;
  background: #222;
  background-color: ${(props)=>props.controlsBackgroundColor}
`

const IconButton = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 0;
  cursor: pointer;
  color: #888;
  opacity: 0.4;
`

export default CameraControls;