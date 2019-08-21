import React from 'react';
import styled from 'styled-components';
import useStore from '../../../store';

const CameraControls = function({controlsColor, controlsBackgroundColor }){

  const { increaseCameraSize, rotateCamera } = useStore();  

  return (<CameraControlsContainer controlsBackgroundColor={controlsBackgroundColor}>
    <IconButton onClick={()=>{increaseCameraSize(-2)}}>
      <img src="../icons/zoom-in-32x32.png" alt="zoom-in"/>
    </IconButton>
    <IconButton onClick={()=>{increaseCameraSize(2)}}>
      <img src="../icons/zoom-out-32x32.png" alt="zoom-out"/>
    </IconButton>
    <IconButton onClick={()=>{rotateCamera(Math.PI/4)}}>
      <img src="../icons/rotate-left-32x32.png" alt="zoom-in"/>
    </IconButton>
    <IconButton onClick={()=>{rotateCamera(-Math.PI/4)}}>
      <img src="../icons/rotate-right-32x32.png" alt="zoom-out"/>
    </IconButton>
  </CameraControlsContainer>)
}


const CameraControlsContainer = styled.div`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props)=>props.controlsBackgroundColor}
`

const IconButton = styled.div`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 0;
  cursor: pointer;
`

export default CameraControls;