import React from 'react';

function remove({className, color}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={className} viewBox="0 0 24 24"><path fill={color} d="M19 13H5v-2h14v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>;
}

export default remove