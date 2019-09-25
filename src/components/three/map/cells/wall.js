import React from 'react';
import * as THREE from 'three';
import customLambertVertexShader from '../../../../utils/shaders/meshlambert_vert.glsl';
import customDepthVertexShader from '../../../../utils/shaders/customDepth_vert.glsl';


export default function Wall({texture, offsets}) {

    const vertices = [
        // front
        {pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 1]},
        {pos: [1, -1, 1], norm: [0, 0, 1], uv: [0.5, 1],},
        {pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 0],},
        {pos: [1, 1, 1], norm: [0, 0, 1], uv: [0.5, 0],},
        // right
        {pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 1],},
        {pos: [1, -1, -1], norm: [1, 0, 0], uv: [0.5, 1],},
        {pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 0],},
        {pos: [1, 1, -1], norm: [1, 0, 0], uv: [0.5, 0],},
        // back
        {pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 1],},
        {pos: [-1, -1, -1], norm: [0, 0, -1], uv: [0.5, 1],},
        {pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 0],},
        {pos: [-1, 1, -1], norm: [0, 0, -1], uv: [0.5, 0],},
        // left
        {pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 1],},
        {pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [0.5, 1],},
        {pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 0],},
        {pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [0.5, 0],},
        // top
        {pos: [1, 1, -1], norm: [0, 1, 0], uv: [0.5, 0.5],},
        {pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0.5],},
        {pos: [1, 1, 1], norm: [0, 1, 0], uv: [0.5, 0],},
        {pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 0],},
        // bottom
        {pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 1],},
        {pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 1],},
        {pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 0],},
        {pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 0],},
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
        4,  5,  6,   6,  5,  7,  // right
        8,  9, 10,  10,  9, 11,  // back
        12, 13, 14,  14, 13, 15,  // left
        16, 17, 18,  18, 17, 19,  // top
        20, 21, 22,  22, 21, 23,  // bottom
    ]);

    geometry.addAttribute( 'instanceOffset', new THREE.InstancedBufferAttribute( offsets, 3 ) );

    const material = new THREE.MeshLambertMaterial( {
        map: texture,
        color: "#878"
    });

    material.onBeforeCompile = function( shader ) {
        shader.vertexShader = customLambertVertexShader;
    };

    // custom depth material - required for instanced shadows
    var customDepthMaterial = new THREE.MeshDepthMaterial();
    customDepthMaterial.onBeforeCompile = function( shader ) {
      shader.vertexShader = customDepthVertexShader;
    };
    customDepthMaterial.depthPacking = THREE.RGBADepthPacking;
    //

    return (
        <mesh
            frustumCulled={false}
            castShadow={true}
            receiveShadow={true}
            customDepthMaterial={customDepthMaterial}
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