import React, { Fragment } from 'react';
import { useSprings , animated , config  } from 'react-spring/three';
import * as THREE from 'three';
import useStore from '../../../../store'

var show_shadow_geom = false

export default function Robot({loadedAssetData, position}) {

    const { 
      cameraOrthographicAngle
    } = useStore()

    loadedAssetData['robot'].minFilter = THREE.NearestFilter;
    loadedAssetData['robot'].magFilter = THREE.NearestFilter;
    
    var spriteMaterial = new THREE.SpriteMaterial( { map: loadedAssetData['robot'], color: 0xffffff } );
    
    console.log(position)
    const springs = useSprings(2, [{
      to: {
        position: [...position],
      },  
      from: { 
        position: [...position],
      }
    },{
      to: {
        progress: 1
      },  
      from: { 
        progress: 0
      },
      reset: true,
      config: config.default//{ mass: 1, tension: 290, friction: 32 }
    }])
    
    return (
      
      <animated.group

        position-x={springs[0].position.interpolate((x)=>{
          return x;
        })}
        position-z={springs[0].position.interpolate((x,y,z)=>{
          return z;
        })}
        // position-y={springs[1].progress.interpolate({
        //   range: [0, 0.65, 1],
        //   output: [0, 0.55, 0]
        // }).interpolate((progress)=>{
        //   return (progress - 1)*7*(-progress) + 0.5
        // })}
      
      >
        {/* <sprite 
          scale={[2,2,2]}>
          <primitive attach="material" object={spriteMaterial}/>
        </sprite> */}


        <mesh

          rotation={[0,cameraOrthographicAngle*-1,0]}
          material-colorWrite={show_shadow_geom}
          material-depthWrite={show_shadow_geom}
          castShadow={true}
          >
          <primitive
            attach="geometry"
            visible={true}
            object={loadedAssetData['model_gltf'].scene}
            castShadow={true}
            position={[0, -1, 0]} 
          />
        </mesh>
        
      </animated.group>
    )
}
