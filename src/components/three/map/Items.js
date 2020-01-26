import React, { Fragment } from 'react';
import Rock from './items/Rock';
import useStore from '../../../store';

export default function Items({textures}) {

  
  const rocks = useStore(state => state.items.rocks);


  if (!textures) return null;

  return (
    <Fragment>
      {rocks.map((rock)=>{
        return <Rock texture={textures['rock_gltf']} position={rock.position} key={rock.id}/> 
      })}
      
    </Fragment>
  )
}
