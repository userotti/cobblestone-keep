import React, { useMemo, Fragment } from 'react';
import Robot from './characters/Robot';
import useStore from '../../../store';
import { useSprings , animated , config  } from 'react-spring/three';
import { Howl } from 'howler';
import * as THREE from 'three';



export default function Player() {

  const playerStore = useStore(state => state.player);
  const setMenuVisiblity = useStore(state => state.modeManager.setMenuVisiblity);
  const testForModeMenuRemoval = useStore(state => state.modeManager.testForModeMenuRemoval);
  
  
  const muted = useStore(state => state.game);

  const {sound, sound_end} = useMemo(()=>{
    return {
      sound: new Howl({
        src: ['/assets/sounds/sound_jump.wav'],
        volume: 0.3
      }),
      sound_end: new Howl({
        src: ['/assets/sounds/sound_robot_speak.wav'],
        volume: 0.1
      }),
      
    }

  }, []);

  const springs = useSprings(3, [{
    from: { 
      position: [...playerStore.position],
    },
    to: {
      position: [...playerStore.position],
    },
    config: config.default  
    
  },{
    from: { 
      progress: 0
    },
    to: {
      progress: playerStore.hopping ? 1 : 0
    },
    onStart: () => { !muted && sound.play() },
    onRest: () => { !muted && sound_end.play() },
    reset: true,
    config: config.default //{ mass: 1, tension: 290, friction: 32 }
  },{
    from: { 
      Yrotation: playerStore.Yrotation,
    },
    to: {
      Yrotation: playerStore.Yrotation,
    }
  }])
  
  return (
    <Fragment>
        <animated.group
          rotation-y={springs[2].Yrotation}
          position-x={springs[0].position.interpolate((x)=>{
            return x;
          })}
          position-z={springs[0].position.interpolate((x,y,z)=>{
            return z;
          })}
          position-y={springs[1].progress.interpolate({
            range: [0, 0.55, 1],
            output: [0, 0.25, 1]
          }).interpolate((progress)=>{
            return (progress - 1)*6*(-1*progress)
          })}
          onClick={(e)=>{
            console.log("Player Click");
            e.stopPropagation();
            setMenuVisiblity(true);
            testForModeMenuRemoval();
          }}
        > 
          
            
          <Robot position={[0,0,0]}/>
        </animated.group>

    </Fragment>
    
  )

}

