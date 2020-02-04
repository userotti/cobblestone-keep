import { Canvas, } from 'react-three-fiber';
import React from 'react';
import * as THREE from 'three';

export default function ThreeFibreHTMLCanvas({ children }) {

  return (<Canvas
      onCreated={({gl}) => {
        // gl.gammaFactor = 5
        // gl.gammaInput = true
        // gl.gammaOutput = true
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;

      }}>
      {children}
    </Canvas>
  );
}