import React, { Fragment, useState, useEffect } from 'react';
import Robot from './characters/Robot';
import { getRandomInt } from '../../../utils/functions'
import useStore from '../../../store';

export default function Characters({textures, activeItemMap}) {

  
  const [position, setPosition] = useState([0,0,-0.8]);
  const [position2, setPosition2] = useState([1,0,-2]);
  const cellSize = useStore(state => state.cellSize);
  

  // useEffect(() => {
  //   setTimeout(() => {
  //     let direction = getRandomInt(1,4);
  //     switch (direction){
  //       case 1: {
  //         setPosition([position[0] + (cellSize[0]*2), position[1] , position[2]]);
  //         break;
  //       }
  //       case 2: {
  //         setPosition([position[0], position[1], position[2] + (cellSize[0]*2)]);
  //         break;
  //       }
  //       case 3: {
  //         setPosition([position[0] - (cellSize[0]*2), position[1], position[2]]);
  //         break;
  //       }
  //       case 4: {
  //         setPosition([position[0], position[1], position[2] - (cellSize[0]*2)]);
  //         break;
  //       }
  //       default: break;
  //     }
  //   }, 800);

  // }, [setPosition, position, cellSize, setPosition2, position2]);

  if (!textures || !activeItemMap) return null
  return (
    <Fragment>
      <Robot position={position} texture={textures['robot']} />
    </Fragment>
  )
}
