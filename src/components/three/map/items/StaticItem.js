import React, { Fragment } from 'react';
import * as THREE from 'three';

export default function StaticItem({materialTexture, materialColor, position, scale, shadowGeometry, onClick}) {


    materialTexture.minFilter = THREE.NearestFilter;
    materialTexture.magFilter = THREE.NearestFilter;
    var spriteMaterial = new THREE.SpriteMaterial( { map: materialTexture, color: materialColor } );
        
    return (
      <Fragment>
        <sprite
          scale={scale}
          position={new THREE.Vector3(...position)}
          onClick={onClick}
          center-x={0.5}
          center-y={1}
        >
            <primitive attach="material" object={spriteMaterial}/>
        </sprite>
        {shadowGeometry ? <mesh
          castShadow={true}
          position={new THREE.Vector3(...position)}
          material-colorWrite={false}
          material-depthWrite={false}
        >
            <primitive attach="geometry" object={shadowGeometry} visible={false}/>
        </mesh> : null}
      </Fragment>  
       
    )
}
