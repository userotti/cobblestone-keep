import React, { useMemo } from 'react';
import useStore from '../../../../store';


export default function Rock({position, Yrotation, uniformScale}) {

    const loadedAssetData = useStore(state => state.assets.loadedAssetData); 
    const { mesh } = useMemo(()=>{
      return {
        mesh: loadedAssetData['rock_gltf'].scene.clone()
      }
    }, [loadedAssetData])

    return (
      <primitive 
        object={mesh}
        position={position}   
        scale={uniformScale}
        rotation-y={Yrotation}
      />
    )
}
