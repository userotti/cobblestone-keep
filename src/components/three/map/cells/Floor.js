import React from 'react';
import * as THREE from 'three';
import customLambertVertexShader from '../../../../utils/shaders/meshlambert_vert.glsl';

export default function Floor({texture, offsets, rotations}) {

    const vertices = [
      
        // bottom
        {pos: [-1, -1, -1], norm: [0, 1, 0], uv: [0, 1],},
        {pos: [-1, -1, 1], norm: [0, 1, 0], uv: [1, 1],},
        {pos: [1, -1, -1], norm: [0, 1, 0], uv: [0, 0],},
        {pos: [1, -1, 1], norm: [0, 1, 0], uv: [1, 0],},
    ];

    const numVertices = vertices.length;
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    const positions = new Float32Array(numVertices * positionNumComponents);
    const normals = new Float32Array(numVertices * normalNumComponents);
    const uvs = new Float32Array(numVertices * uvNumComponents);
    let posNdx = 0;
    let nrmNdx = 0;
    let uvNdx = 0;


    for (const vertex of vertices) {
        positions.set(vertex.pos, posNdx);
        normals.set(vertex.norm, nrmNdx);
        uvs.set(vertex.uv, uvNdx);
        posNdx += positionNumComponents;
        nrmNdx += normalNumComponents;
        uvNdx += uvNumComponents;
    }

    const geometry = new THREE.InstancedBufferGeometry();

    geometry.addAttribute(
        'position',
        new THREE.BufferAttribute(positions, positionNumComponents));
    geometry.addAttribute(
        'normal',
        new THREE.BufferAttribute(normals, normalNumComponents));
    geometry.addAttribute(
        'uv',
        new THREE.BufferAttribute(uvs, uvNumComponents));

    geometry.setIndex([
        0,  1,  2,   2,  1,  3,  // front
    ]);

    geometry.addAttribute( 'instanceOffset', new THREE.InstancedBufferAttribute( offsets, 3 ) );
    geometry.addAttribute( 'instanceRotation', new THREE.InstancedBufferAttribute( rotations, 1 ) );
    
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    
    const material = new THREE.MeshLambertMaterial( {
        map: texture,
        color: "#878"
    });

    material.onBeforeCompile = function( shader ) {
        shader.vertexShader = customLambertVertexShader;
    };


    return (
        <mesh
            frustumCulled={false}
            castShadow={true}
            receiveShadow={true}
            onPointerOver={e => console.log('hover')}
            onClick={(e) => {
                console.log('click', e);
            }}
        >
            <primitive attach="geometry" object={geometry}/>
            <primitive attach="material" object={material}/>
        </mesh>
    )
}
