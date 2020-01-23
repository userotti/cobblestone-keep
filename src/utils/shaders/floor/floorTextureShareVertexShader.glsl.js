export default /* glsl */`
#define LAMBERT
attribute vec3 instanceOffset;
attribute float instanceRotation;
attribute vec2 instanceUv;

uniform vec2 uvTextureSize;
uniform vec2 uvTileSize; 


varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}

void main() {
	

  vUv = rotateUV(uv, instanceRotation);

  #ifdef USE_UV

    float x_scale = uvTileSize.x / uvTextureSize.x;
    float y_scale = uvTileSize.y / uvTextureSize.y;

    mat3 scaleMatrix = mat3(
      1, 0, 0, // first column (not row!)
      0, 0.25, 0, // second column
      0, 0, 1  // third column
    );

    mat3 translateMatrix = mat3(
      1, 0, 0, // first column (not row!)
      0, 1, 0, // second column
      instanceUv.x, instanceUv.y, 1  // third column
    );

    mat3 rotationMatrix = mat3(
      1, 0, 0, // first column (not row!)
      0, 1, 0, // second column
      0, 0, 1  // third column
    );
    
    vUv = ( translateMatrix * scaleMatrix * rotationMatrix * uvTransform * vec3( vUv, 1 ) ).xy;

    

  #endif
  

  #include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	
	transformed = transformed + instanceOffset;
	
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}
`;