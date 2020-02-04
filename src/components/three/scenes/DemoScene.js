import React, {useEffect, Fragment} from 'react';
import ModeManager from '../../ui/ModeManager.js';

import * as THREE from 'three';
import CustomOrthographicCamera from '../CustomOrthographicCamera.js';
import ThreeFibreHTMLCanvas from '../ThreeFibreHTMLCanvas.js';
import useStore from '../../../store';


export default function GameScene() {
  
  const loadAssets = useStore(state => state.assets.loadAssets);
  const loadedAssetData = useStore(state => state.assets.loadedAssetData);  

  useEffect(() => {
    loadAssets();
  }, [
    loadAssets 
  ])

  if(!loadedAssetData) return <div className="error">loadedAssetData not loaded yet...</div>

  return (
    <Fragment>
      <ThreeFibreHTMLCanvas>
        <CustomOrthographicCamera/>
        <hemisphereLight color={0xffffff} intensity={1.9}/>
        
      </ThreeFibreHTMLCanvas>
      <ModeManager/>
    </Fragment>
    
  );
}


