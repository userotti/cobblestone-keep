import React, { Fragment } from 'react';
import Rock from './items/Rock';
import Scrap from './items/Scrap';
import useStore from '../../../store';

export default function Items() {

  const { getItemsOfType } = useStore(state => state.items);

  return (
    <Fragment>
      {getItemsOfType('rock').map((rock)=>{
        return <Rock position={rock.position} Yrotation={rock.Yrotation} key={rock.id} uniformScale={rock.uniformScale}/> 
      })}
      {getItemsOfType('scrap').map((scrap)=>{
        return <Scrap position={scrap.position} Yrotation={scrap.Yrotation} key={scrap.id} uniformScale={scrap.uniformScale}/> 
      })}
    </Fragment>
  )
}
