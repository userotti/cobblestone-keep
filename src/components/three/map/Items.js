import React, { Fragment } from 'react';
import Rock from './items/Rock';
import useStore from '../../../store';

export default function Items({textures}) {

  
  const rocks = useStore(state => state.items.rocks);


  if (!textures) return null;

  return (
    <Fragment>
      {rocks.map((rock)=>{
        return <Rock blenderScene={textures['rock_gltf'].scene} position={rock.position} Yrotation={rock.Yrotation} key={rock.id}/> 
      })}
      
    </Fragment>
  )
}
