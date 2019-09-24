import React from 'react';
import styled from 'styled-components';
import useStore from '../../../store';

const CameraControls = function({controlsColor, controlsBackgroundColor }){

  const { increaseCameraSize, rotateCamera, increaseCameraVisibleRadius } = useStore();  

  return (<CameraControlsContainer controlsBackgroundColor={controlsBackgroundColor}>
    {/* <IconButton onClick={()=>{increaseCameraVisibleRadius(1)}}>
      <span> +radius </span>
    </IconButton>
    <IconButton onClick={()=>{increaseCameraVisibleRadius(-1)}}>
      <span> -radius </span>
    </IconButton> */}
    <IconButton onClick={()=>{increaseCameraSize(-4)}}>
      <img src="../icons/zoom-in-32x32.png" alt="zoom-in"/>
    </IconButton>
    <IconButton onClick={()=>{increaseCameraSize(4)}}>
      <img src="../icons/zoom-out-32x32.png" alt="zoom-out"/>
    </IconButton>
    <IconButton onClick={()=>{rotateCamera(Math.PI/8)}}>
      <img src="../icons/rotate-left-32x32.png" alt="zoom-in"/>
    </IconButton>
    <IconButton onClick={()=>{rotateCamera(-Math.PI/8)}}>
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
  left: 0;
  background-color: ${(props)=>props.controlsBackgroundColor}
`

const IconButton = styled.div`
  background: #fff6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 0;
  cursor: pointer;
  color: white;
`

export default CameraControls;