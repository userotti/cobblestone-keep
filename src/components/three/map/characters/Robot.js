import React, { useMemo } from 'react';
import useStore from '../../../../store'

export default function Robot({position}) {

    const loadedAssetData = useStore(state => state.assets.loadedAssetData);  
    
    const { 
      robotMesh
    } = useMemo(()=>{
      return {
        robotMesh : loadedAssetData['model_gltf'].scene.clone()
      }
    }, [loadedAssetData])  

    
    return (<primitive object={robotMesh} position={position}/>)
}
