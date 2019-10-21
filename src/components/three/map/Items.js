import React, { Fragment } from 'react';
import StaticItem from './items/StaticItem';
import useStore from '../../../store';
import * as THREE from 'three';

export default function Items({textures}) {

  const items = useStore(state => state.items.all);
  let cylinderShadowGeometry = new THREE.CylinderGeometry(0.5,0.5,1,8);   
  
  return (
    <Fragment>
      { items && items.map((item)=>{
        return <StaticItem 
          key={item.id}
          materialTexture={textures[item.materialTextureName]} 
          materialColor={item.materialColor} 
          position={item.position}
          scale={item.scale} 
          shadowGeometry={cylinderShadowGeometry}
        />
      })}
    </Fragment>
  )
}
