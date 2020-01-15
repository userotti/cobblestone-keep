import React from 'react';
import styled from 'styled-components';
import useStore from '../../store';

const CameraControls = function({controlsColor, controlsBackgroundColor }){

  const { 
    increaseCameraSize, 
    rotateCamera,
  } = useStore();  

  return (<CameraControlsContainer controlsBackgroundColor={controlsBackgroundColor}>
   
    {/* <IconButton onClick={()=>{
      console.log([interactionPlanePosition[0] + 0.1, interactionPlanePosition[1]]);
      setInteractionPlanePosition([interactionPlanePosition[0] + 0.1, interactionPlanePosition[1]])
      }}>
      <span> Do something - </span>
    </IconButton>
    
    <IconButton onClick={()=>{
      console.log([interactionPlanePosition[0] -0.1, interactionPlanePosition[1]]);
      setInteractionPlanePosition([interactionPlanePosition[0] -0.1, interactionPlanePosition[1]])
      }}>
      <span> Do something + </span>
    </IconButton> */}

    <IconButton onClick={()=>{increaseCameraSize(-4)}}>
      <img src="../icons/zoom-in-32x32.png" alt="zoom-out"/>
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