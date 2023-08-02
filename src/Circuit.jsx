import {  useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect } from 'react'
import useStore from './useStore.js'

export function Circuit()
{
    const { scene, materials } = useGLTF('/models/circuit.glb')
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

    materials.circuit.envMapIntensity = envMapIntensity

    return <>
        <primitive object={ scene } />
    </>
}