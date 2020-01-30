import React, { Fragment } from 'react';
import Player from './Player';

export default function Characters({loadedAssetData}) {

  return (
    <Fragment>
      <Player/>
      {/* <Enemy position={[-4,0,-2]} loadedAssetData={loadedAssetData} />
      <Enemy position={[2,0,12]} loadedAssetData={loadedAssetData} /> 
      <Enemy position={[4,0,-8]} loadedAssetData={loadedAssetData} />  */}

    </Fragment>
  )
}
