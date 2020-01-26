import React, { Fragment } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';

import useStore from '../../../../store';

export default function ActionTile({texture, position}) {

    const { 
      updatePlayerPosition
    } = useStore()

    let material = new THREE.MeshLambertMaterial({ 
      map : texture,
      side : THREE.DoubleSide,
      visible: false
    })


    let planeGeometry = new THREE.PlaneGeometry(1, 1);

    return (
      
      <mesh
        receiveShadow={false}
        onClick={(e) => {
          // removeShroud(position)
          updatePlayerPosition([position[0],0,position[2]])
        }}

        transparent={true}
        
        material-colorWrite={false}
        material-depthWrite={false}
        position={position}    
        scale={[2,2,2]}
        // visible={false}
        rotation={[Math.PI/2,0,0]}    
      >
        <primitive attach="geometry" object={planeGeometry} />
        <primitive attach="material" object={material}/>
      </mesh>
      
    )
}
