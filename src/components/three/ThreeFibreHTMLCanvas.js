import { Canvas, } from 'react-three-fiber';
import React from 'react';
import * as THREE from 'three';

export default function ThreeFibreHTMLCanvas({ children }) {

  return (<Canvas
      onCreated={({gl}) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}>
      {children}
    </Canvas>
  );
}