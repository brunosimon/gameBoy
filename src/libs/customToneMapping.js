import * as THREE from 'three'

THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment.replace(
    'vec3 CustomToneMapping( vec3 color ) { return color; }',
    `#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )
    float toneMappingWhitePoint = 1.0;
    vec3 CustomToneMapping( vec3 color )
    {
        color *= toneMappingExposure;
        return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );
    }`
)