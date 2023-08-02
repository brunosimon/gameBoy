import {  useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect } from 'react'
import useStore from './useStore.js'

export function Sticker()
{
    const { scene, nodes, materials } = useGLTF('/models/sticker.glb')
    const [ envMapIntensity ] = useStore(state => [ state.envMapIntensity ])

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

    // Materials
    materials.sticker.envMapIntensity = envMapIntensity
    materials.sticker.map.anisotropy = 8
    materials.sticker.normalMap.anisotropy = 8
    materials.sticker.roughnessMap.anisotropy = 8
    
    materials.stickerBack.envMapIntensity = envMapIntensity

    return <>
        <primitive object={ scene } />
    </>
}