import React, {Suspense, Fallback, useEffect, useRef, useMemo} from 'react';


import * as THREE from 'three'
import {  useFrame, useThree } from 'react-three-fiber'


import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import Characters from '../map/Characters';
import Items from '../map/Items';
import Camera from '../Camera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';



function Swarm({ count, mouse }) {
  const mesh = useRef()
  // const light = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  const dummy = useMemo(() => new THREE.Object3D(), [])
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -5 + Math.random() * 10
      const yFactor = -5 + Math.random() * 10
      const zFactor = -5 + Math.random() * 10
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])
  // The innards of this hook will run every frame
  useFrame(state => {
    // Makes the light follow the mouse
    // light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (mouse.current[0] - particle.mx) * 0.01
      particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
      // Update the dummy object
      // dummy.position.set(
      //   (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      //   (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      //   (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      // )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      {/* <pointLight ref={light} distance={40} intensity={8} color="lightblue">
        <mesh>
          <sphereBufferGeometry attach="geometry" args={[3.5, 32, 32]} />
          <meshBasicMaterial attach="material" color="lightblue" />
        </mesh>
      </pointLight> */}
      <instancedMesh ref={mesh} args={[null, null, count]} frustumCulled={false} castShadow={true}>
        <dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
        <meshStandardMaterial attach="material" color="#700020" />
      </instancedMesh>
    </>
  )
}

export default function GameScene({assets}) {

  
  const setActiveCellMapParameters = useStore(state => state.cellMap.setActiveCellMapParameters);
  const movePlayerTowardsCellAt = useStore(state => state.player.movePlayerTowardsCellAt);
  const setPlayerPositionToRandomOpenCell = useStore(state => state.player.setPlayerPositionToRandomOpenCell);
  const setCameraFocusPointPosition = useStore(state => state.setCameraFocusPointPosition);
  const setCameraFocusPointOnPlayer = useStore(state => state.setCameraFocusPointOnPlayer);

  
  const loadAssets = useStore(state => state.loadAssets);
  const loadedAssetData = useStore(state => state.loadedAssetData);

  const mouse = useRef([0, 0])

  useEffect(() => {
    loadAssets()
    setActiveCellMapParameters({
      width: 15,
      height: 15,
      roomSizeRange: [15,15],
      maxRooms: 1,
      type: 'cellular'
    })

    setPlayerPositionToRandomOpenCell()
    setCameraFocusPointOnPlayer()

  }, [loadAssets, setActiveCellMapParameters])

  if(!loadedAssetData) return null

  return (
    <ThreeFibreHTMLCanvas>
      <Camera>
        <hemisphereLight color={0xffffff} intensity={1.2}/>
        <directionalLight
          intensity={0.9}
          color={0xffffff}
          position={[-65, 60, 65]}
          castShadow={true}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-18}
          shadow-camera-bottom={-18}
          shadow-camera-top={18}
          shadow-camera-right={18}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Swarm mouse={mouse} count={20} />

        <Structural loadedAssetData={loadedAssetData}/>

        {/* <Items textures={loadedAssetData}/>
         */}
        <Characters loadedAssetData={loadedAssetData}/>
     
        <StructuralOnTapPlane onTap={(event)=>{
          // onPlaneTap([event.point.x, event.point.y, event.point.z]);
          movePlayerTowardsCellAt([event.point.x, event.point.y, event.point.z]);
          setCameraFocusPointOnPlayer()
          // setPlayerPositionFromTapPoint([event.point.x, event.point.y, event.point.z]);
          // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
        }}/>
      </Camera>
    </ThreeFibreHTMLCanvas>
  );
}
