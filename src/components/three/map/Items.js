import React, { Fragment } from 'react';
import Rock from './items/Rock';
import Scrap from './items/Scrap';
import useStore from '../../../store';

export default function Items({textures}) {

  const rocks = useStore(state => state.items.rocks);
  const scraps = useStore(state => state.items.scraps);


  if (!textures) return null;

  return (
    <Fragment>
      {rocks.map((rock)=>{
        return <Rock blenderScene={textures['rock_gltf'].scene} position={rock.position} Yrotation={rock.Yrotation} key={rock.id}/> 
      })}
      {scraps.map((scrap)=>{
        return <Scrap blenderScene={textures['scrap_gltf'].scene} position={scrap.position} Yrotation={scrap.Yrotation} key={scrap.id}/> 
      })}
    </Fragment>
  )
}
