import React, { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function Wall({ tex_url, px_url, nx_url, py_url, ny_url, pz_url, nz_url }) {
  const [texture] = useMemo(() => new THREE.TextureLoader().load(tex_url), [tex_url])
  
  console.log("texture: ", texture);
  return (
    <mesh>
      <planeBufferGeometry 
        attach="geometry" 
        args={[1, 1]} />
      <meshLambertMaterial attach="material" transparent>
        <primitive attach="map" object={texture} />
      </meshLambertMaterial>
    </mesh>
  )
}