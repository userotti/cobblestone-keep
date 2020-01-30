import React, { useMemo } from 'react';


export default function Rock({blenderScene, position, Yrotation}) {

    const { meshMemo } = useMemo(()=>{
      return {
        meshMemo: blenderScene.clone()
      }
    }, [blenderScene])

    return (
      <primitive 
        object={meshMemo}
        position={position}   
        scale={[0.2,0.2,0.2]}
        rotation-y={Yrotation}
      />
    )
}
