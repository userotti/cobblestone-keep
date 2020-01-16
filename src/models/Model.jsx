import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  
export default function ModelX(props) {

  return null
  // const group = useRef()
  // const gltf = useLoader(GLTFLoader, './robot1.glb')

  // return (
  //   <group ref={group} {...props}>
  //     <scene name="Scene" >
  //       <mesh name="cube_leg" position={[0.16521203517913818, 0.9633243083953857, -0.07318369299173355,]} rotation={[0, 1.5707963267948966, 0,]} scale={[0.19428561627864838, 0.47299158573150635, 0.30897432565689087,]} >
  //         <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
  //         <meshStandardMaterial attach="material" {...gltf.__$[1].material} name="Material" />
  //       </mesh>
  //       <mesh name="cube_body" position={[0.012318532913923264, 0.9716430902481079, -0.07318370789289474,]} rotation={[0, 1.5707963267948966, 0,]} scale={[0.2881403863430023, 0.5533628463745117, 0.5094640254974365,]} >
  //         <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
  //         <meshStandardMaterial attach="material" {...gltf.__$[2].material} name="Material.001" />
  //       </mesh>
  //       <mesh name="cube_leg2" position={[-0.3792831599712372, 0.9688860177993774, -0.07318376004695892,]} rotation={[0, 1.5707963267948966, 0,]} scale={[0.19605375826358795, 0.4772961139678955, 0.3117861747741699,]} >
  //         <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
  //         <meshStandardMaterial attach="material" {...gltf.__$[3].material} name="Material.003" />
  //       </mesh>
  //       <mesh name="cube_arm2" position={[0.5969332456588745, 1.1116969585418701, -0.07318367809057236,]} rotation={[0, 1.5707963267948966, 0,]} scale={[0.21480920910835266, 0.4127415716648102, 0.14964573085308075,]} >
  //         <bufferGeometry attach="geometry" {...gltf.__$[4].geometry} />
  //         <meshStandardMaterial attach="material" {...gltf.__$[4].material} name="Material.004" />
  //       </mesh>
  //       <mesh name="cube_arm" position={[-0.5759285092353821, 1.1116098165512085, -0.07318376004695892,]} rotation={[0, 1.5707963267948966, 0,]} scale={[0.21480920910835266, 0.4127415716648102, 0.14964573085308075,]} >
  //         <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
  //         <meshStandardMaterial attach="material" {...gltf.__$[5].material} name="Material.005" />
  //       </mesh>
  //       <mesh name="cuibe_head" position={[0.012318532913923264, 1.6438885927200317, -0.07318370789289474,]} rotation={[0, 1.5707963267948966, 0,]} scale={[0.2155541032552719, 0.13855236768722534, 0.19118323922157288,]} >
  //         <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
  //         <meshStandardMaterial attach="material" {...gltf.__$[6].material} name="Material.006" />
  //       </mesh>
  //     </scene>
  //   </group>
  // )
}