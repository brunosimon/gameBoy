import {  useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import useStore from './useStore.js'
import { DynamicTween, easeInOutCubic } from 'twon'
import { useFrame } from '@react-three/fiber'

export function Sticker({ exploded })
{
    const { scene, nodes, materials } = useGLTF('/models/sticker.glb')
    const [ envMapIntensity ] = useStore(state => [ state.envMapIntensity ])

    /**
     * Meshes
     */
    useEffect(() =>
    {
        scene.traverse((_child) =>
        {
            if(_child.isMesh)
            {
                _child.castShadow = true
                _child.receiveShadow = true
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
        nodes.Scene.position.z = tween.getValue() * 4.5
    })

    /**
     * Materials
     */
    materials.sticker.envMapIntensity = envMapIntensity
    materials.sticker.map.anisotropy = 8
    materials.sticker.normalMap.anisotropy = 8
    materials.sticker.roughnessMap.anisotropy = 8
    
    materials.stickerBack.envMapIntensity = envMapIntensity
    materials.sticker.roughness = 0.4

    return <>
        <primitive object={ scene } />
    </>
}