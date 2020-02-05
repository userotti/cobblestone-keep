import React, { Fragment, useMemo } from 'react';

import Player from './Player';
import PlayerPathIndicator from './PlayerPathIndicator';

export default function Characters() {

  

  return (
    <Fragment>
      <PlayerPathIndicator/>
      <Player/>
    </Fragment>
  )
}
