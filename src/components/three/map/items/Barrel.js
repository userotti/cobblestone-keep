import React, { Fragment } from 'react';
import * as THREE from 'three';

import {  useFrame } from 'react-three-fiber'

export default function Barrel({texture, position}) {
    return (<primitive object={texture.scene} position={position}/>)
}
