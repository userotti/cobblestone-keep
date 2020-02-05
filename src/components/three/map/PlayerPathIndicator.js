import React, { useMemo, Fragment } from 'react';
import useStore from '../../../store';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';



export default function PathIndicator() {

  let path = useStore(state => state.player.currentPath);
  const cellToPostion = useStore(state => state.cellMap.getPositionVectorArrayFromCellLocation);
  path.splice(0,1); 
  
  return (
    <animated.group>
      {path.map((cellLocation, index)=>{
          const position = cellToPostion(cellLocation);
          return (<mesh key={index}
            position-x={position[0]}
            position-y={position[1]+0.5}
            position-z={position[2]}
            castShadow={true}
          >
            <sphereGeometry attach="geometry" args={[0.15, 32, 32]}/>
            <meshBasicMaterial attach="material" color={0xffff00}/>
          </mesh>)  
        })
      }
    </animated.group>
  )

}

