import React, { Fragment, useMemo } from 'react';
import * as THREE from 'three';


export default function Rock({blenderScene, position, Yrotation}) {

    const { meshMemo } = useMemo(()=>{
      return {
        meshMemo: blenderScene.clone()
      }
    })

    return (
      <primitive 
        object={meshMemo}
        position={position}   
        scale={[0.2,0.2,0.2]}
        rotation-y={Yrotation}
      />
    )
}
