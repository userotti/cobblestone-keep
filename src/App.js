import React from 'react';
import './App.css';

import * as THREE from 'three'
import { Canvas, useRef } from 'react-three-fiber'

function Blokkie({ position }) {
  return (
    <group ref={ref => console.log('we have access to the instance', ref)}>
      <mesh
        visible
        userData={{ test: "hello" }}
        position={new THREE.Vector3(...position)}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry( 5, 5, 5)}
        material={new THREE.MeshBasicMaterial({ color: new THREE.Color('indianred'), transparent: true })} />
    </group>
  )
}



function App() {

  
  return (
    <Canvas
      updateDefaultCamera={false}
      onCreated={(gl) => {

        const aspect = window.innerWidth / window.innerHeight;
        const d = 50;
        
        let camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        gl.setDefaultCamera(camera);
        
        camera.position.set( 20, 20, 20 ); // all components equal
        camera.left = -(d * aspect);
        camera.right = (d * aspect);
        camera.top = d;
        camera.bottom = -(d);
        camera.lookAt( gl.scene.position ); // or the origin
        camera.updateProjectionMatrix();
        

      }}
      >
      {/* {array.map(()=><Blokkie position={[(Math.random() - Math.random())*100, (Math.random() - Math.random())*100, -10]}/>)} */}
      <Blokkie position={[0,0,0]}/>
    </Canvas>
      
  );
}

export default App;