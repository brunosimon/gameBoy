import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { DynamicTween, easeInOutCubic } from 'twon'
import useStore from './helpers/useStore.js'

export function Case()
{
    const { scene, nodes, materials } = useGLTF('/models/case.glb')
    const [ exploded, wireframe ] = useStore(state => [ state.exploded, state.wireframe ])
    const back = useRef()
    const front = useRef()
    
    /**
     * Configs
     */
    const config = useControls(
        'cartridge.material',
        {
            transmissionSampler: false,
            backside: true,
            samples: { value: 10, min: 1, max: 32, step: 1 },
            resolution: { value: 2048, min: 256, max: 2048, step: 256 },
            transmission: { value: 1, min: 0, max: 1 },
            roughness: { value: 0.35, min: 0, max: 1, step: 0.01 },
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

    /**
     * Meshes
     */
    useEffect(() =>
    {
        scene.traverse((_child) =>
        {
            if(_child.isMesh)
            {
                // _child.castShadow = true
                // _child.receiveShadow = true
            }
        })
    }, [])

    /**
     * Explode animation
     */
    const [ tween ] = useState(() =>
    {
        return new DynamicTween(0, { ease: easeInOutCubic, duration: 2000 })
    })

    useEffect(() =>
    {
        if(tween)
            tween.to(exploded ? 1 : 0)
    }, [ exploded ])

    useFrame(() =>
    {
        back.current.position.z = tween.getValue() * - 2.5
        front.current.position.z = tween.getValue() * 2
    })

    return <>
        <mesh
            ref={ back }
            geometry={ nodes.caseBack.geometry }
        >
            <MeshTransmissionMaterial
                normalMap={ materials.case.normalMap }
                normalMap-colorSpace={ THREE.LinearSRGBColorSpace }
                normalMapType={ THREE.ObjectSpaceNormalMap }
                background={ new THREE.Color(config.bg) }
                wireframe={ wireframe }
                { ...config }
            />
        </mesh>
        <mesh
            ref={ front }
            geometry={ nodes.caseFront.geometry }
        >
            <MeshTransmissionMaterial
                normalMap={ materials.case.normalMap }
                normalMap-colorSpace={ THREE.LinearSRGBColorSpace }
                normalMapType={ THREE.ObjectSpaceNormalMap }
                background={ new THREE.Color(config.bg) }
                wireframe={ wireframe }
                { ...config }
            />
        </mesh>
    </>
}