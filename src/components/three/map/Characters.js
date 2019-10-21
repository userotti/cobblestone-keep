import React, { Fragment, useState, useEffect } from 'react';
import Hopper from './characters/Hopper';
import useStore from '../../../store';
import * as THREE from 'three';

export default function Characters({textures}) {

  const characters = useStore(state => state.characters.all);
  let cylinderShadowGeometry = new THREE.CylinderGeometry(0.95,0.95,1.5,8);
  
  return (
    <Fragment>
      { characters && characters.map((character)=>{
        return <Hopper 
          key={character.id} 
          materialTexture={textures[character.materialTextureName]} 
          materialColor={character.materialColor} 
          position={character.position}
          scale={character.scale} 
          shadowGeometry={cylinderShadowGeometry} />
      })}
    </Fragment>
  )
}
