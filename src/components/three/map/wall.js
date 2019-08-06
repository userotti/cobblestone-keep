import React, { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function Wall({ tex_url, px_url, nx_url, py_url, ny_url, pz_url, nz_url }) {
  const [texture] = useMemo(() => new THREE.TextureLoader().load(tex_url), [tex_url])
  
  console.log("texture: ", texture);
  return null
}