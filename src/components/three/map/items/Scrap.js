import React, { useMemo, useState } from 'react';
import useStore from '../../../../store';

import * as THREE from 'three';
import { Dom } from 'react-three-fiber'

export default function Scrap({position, Yrotation, uniformScale}) {

    const loadedAssetData = useStore(state => state.assets.loadedAssetData); 
    const { mesh } = useMemo(()=>{
      return {
        mesh: loadedAssetData['scrap_gltf'].scene.clone()
      }
    }, [loadedAssetData])

    const [state, setState] = useState({
      showText: false
    });

    return (
      <group
        position={position}
      > 
        <primitive 
          object={mesh}
          scale={uniformScale}
          rotation-y={Yrotation}
          onPointerEnter={e => setState({
            showText: true
          })}
          onPointerLeave={e => setState({
            showText: false
          })}
        />
        {state.showText ? <Dom position={[0, 1.2, 0]}>
          <p style={{color: '#fff', fontWeight: 'bold'}}>scraps</p>
        </Dom >: null}
        
      </group>
      
    )
}
