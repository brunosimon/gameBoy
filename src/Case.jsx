import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect } from 'react'
import * as THREE from 'three'

export function Case()
{
    const { scene, nodes, materials } = useGLTF('/models/case.glb')
    
    const config = useControls(
        'cartridge.material',
        {
            transmissionSampler: false,
            backside: true,
            samples: { value: 10, min: 1, max: 32, step: 1 },
            resolution: { value: 2048, min: 256, max: 2048, step: 256 },
            transmission: { value: 1, min: 0, max: 1 },
            roughness: { value: 0.02, min: 0, max: 1, step: 0.01 },
            thickness: { value: 0.25, min: 0, max: 10, step: 0.01 },
            ior: { value: 1.46, min: 1, max: 5, step: 0.01 },
            chromaticAberration: { value: 1, min: 0, max: 2 },
            anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
            distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
            distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
            temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
            clearcoat: { value: 0, min: 0, max: 1 },
            attenuationDistance: { value: 0.28, min: 0, max: 10, step: 0.01 },
            attenuationColor: '#ea59ff',
            color: '#ffffff',
            bg: '#000000'
        }
    )

    useEffect(() =>
    {
        scene.traverse((_child) =>
        {
            if(_child.isMesh)
            {
                _child.castShadow = true
                // _child.receiveShadow = true
            }
        })
    }, [])

    return <>
        <mesh
            // rotation-x={ Math.PI * 0.5 }
            geometry={ nodes.case003.geometry }
        >
            <MeshTransmissionMaterial
                normalMap={ materials.case.normalMap }
                normalMap-colorSpace={ THREE.LinearSRGBColorSpace }
                normalMapType={ THREE.ObjectSpaceNormalMap }
                background={ new THREE.Color(config.bg) }
                { ...config }
            />
        </mesh>
    </>
}