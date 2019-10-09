import React, { Fragment, useState, useEffect } from 'react';
import Robot from './characters/Robot';
import { getRandomInt } from '../../../utils/functions'
import useStore from '../../../store';

export default function Characters({textures, activeItemMap}) {

  
  const [position, setPosition] = useState([2,0,2]);
  const cellSize = useStore(state => state.cellSize);
  

  useEffect(() => {
    setTimeout(() => {
      let direction = getRandomInt(1,4);
      switch (direction){
        case 1: {
          setPosition([position[0] + (cellSize[0]*2), position[1] , position[2]]);
          break;
        }
        case 2: {
          setPosition([position[0], position[1], position[2] + (cellSize[0]*2)]);
          break;
        }
        case 3: {
          setPosition([position[0] - (cellSize[0]*2), position[1], position[2]]);
          break;
        }
        case 4: {
          setPosition([position[0], position[1], position[2] - (cellSize[0]*2)]);
          break;
        }
        default: break;
      }
    }, 800);
  }, [setPosition, position, cellSize]);

  if (!textures || !activeItemMap) return null;
  return (
    <Fragment>
      <Robot position={position} texture={textures['robot']} />
    </Fragment>
  )
}
