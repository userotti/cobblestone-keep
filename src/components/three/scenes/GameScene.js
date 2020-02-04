import React, { useContext, useCallback, useMemo, useRef, useState, useEffect, Fragment } from 'react';

import Structural from '../map/Structural.js';
import StructuralOnTapPlane from '../map/StructuralOnTapPlane.js';
import Characters from '../map/Characters.js';
import Items from '../map/Items.js';
import Swarm from '../effects/Swarm.js';
import ModeManager from '../../ui/ModeManager.js';

import * as THREE from 'three';
import CustomOrthographicCamera from '../CustomOrthographicCamera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';
import styled from 'styled-components';


import { Vector2 } from "three"
import { extend, useFrame, useThree } from 'react-three-fiber'

// Outline Effects
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"



extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass })

const context = React.createContext()

const Outline = ({ children }) => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()
  const [hovered, set] = useState([])
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
  useEffect(() => composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)

  return (
    <context.Provider value={set}>
      {children}
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <outlinePass
          attachArray="passes"
          args={[aspect, scene, camera]}
          selectedObjects={hovered}
          // selectedObjects={true}
          visibleEdgeColor="white"
          hiddenEdgeColor="black"
          edgeStrength={50}
          edgeThickness={1}
        />
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
      </effectComposer>
    </context.Provider>
  )
}

function useHover() {
  const ref = useRef()
  const setHovered = useContext(context)
  const onPointerOver = useCallback(() => setHovered(state => [...state, ref.current]), [])
  const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [])
  return { ref, onPointerOver, onPointerOut }
}

const Thing = ({ radius = 1, detail = 64, color = "indianred", ...props }) => {
  return (
    <mesh {...props} scale={[0.1,0.1,0.1]} {...useHover()}>
      <dodecahedronGeometry attach="geometry" args={[40]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default function GameScene() {
  
  const loadAssets = useStore(state => state.assets.loadAssets);
  const loadedAssetData = useStore(state => state.assets.loadedAssetData);  
  const setActiveCellMapParameters = useStore(state => state.cellMap.setActiveCellMapParameters);
  const setPlayerPositionToRandomOpenCell = useStore(state => state.player.setPlayerPositionToRandomOpenCell);
  const setCameraFocusPointOnPlayer = useStore(state => state.camera.setCameraFocusPointOnPlayer);
  const player = useStore(state => state.player);
  const getAllCellLocationsOfType = useStore(state => state.cellMap.getAllCellLocationsOfType);
  const scatterItemsOfType = useStore(state => state.items.scatterItemsOfType);
  
  
  useEffect(() => {
    loadAssets();

    setActiveCellMapParameters({
      width: 45,
      height: 45,
      roomSizeRange: [15,15],
      maxRooms: 1,
      type: 'basic'
    });

    setPlayerPositionToRandomOpenCell();
    setCameraFocusPointOnPlayer();

    
    scatterItemsOfType(5, getAllCellLocationsOfType("floor"), 'rock', true);
    scatterItemsOfType(5, getAllCellLocationsOfType("floor"), 'scrap', false);
    

  }, [
    loadAssets, 
    setActiveCellMapParameters, 
    setPlayerPositionToRandomOpenCell, 
    setCameraFocusPointOnPlayer, 
    scatterItemsOfType, 
    getAllCellLocationsOfType
  ])

  const { 
      dicrectionalLightTarget
    } = useMemo(()=>{
    return {
      dicrectionalLightTarget: new THREE.Object3D()
    }
  }, [])  

  if(!loadedAssetData || !player.position) return <div className="error">loadedAssetData || !player.position not loaded yet...</div>

  dicrectionalLightTarget.position.x = player.position[0];
  dicrectionalLightTarget.position.y = player.position[1];
  dicrectionalLightTarget.position.z = player.position[2];

  // console.log("GameScene return...")
  return (
    <Fragment>
      <ThreeFibreHTMLCanvas>
        <CustomOrthographicCamera/>
        <hemisphereLight color={0xffffff} intensity={1.6}/>

        <directionalLight
          intensity={0.8}
          color={0xffffff}
          position={[player.position[0] + 8, player.position[1] + 10, player.position[2] + 8]}
          target={dicrectionalLightTarget}
          
          castShadow={true}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-9}
          shadow-camera-bottom={-9}
          shadow-camera-top={9}
          shadow-camera-right={9}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <primitive object={dicrectionalLightTarget}/>

        <Structural/>

        <Items textures={loadedAssetData}/>
        
        <Outline>
            <Thing position={[-10, 0, -20]} color="hotpink" />
        </Outline>
        
        <Characters />

        <StructuralOnTapPlane onTap={(event)=>{
          event.stopPropagation();
          console.log("On Plane Tap");


          // onPlaneTap([event.point.x, event.point.y, event.point.z]);
          // movePlayerTowardsCellAt([event.point.x, event.point.y, event.point.z]);
          // setCameraFocusPointOnPlayer();
          
          // setPlayerPositionFromTapPoint([event.point.x, event.point.y, event.point.z]);
          // setCameraFocusPointPosition([event.point.x, event.point.y, event.point.z])
        }}/>
        
      </ThreeFibreHTMLCanvas>
      <ModeManager/>
    </Fragment>
    
  );
}


