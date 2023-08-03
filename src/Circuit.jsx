import {  useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { DynamicTween, easeInOutCubic } from 'twon'
import { useFrame } from '@react-three/fiber'
import useStore from './useStore.js'

export function Circuit()
{
    const { nodes, materials } = useGLTF('/models/circuit.glb')
    const [ envMapIntensity, exploded, wireframe ] = useStore(state => [ state.envMapIntensity, state.exploded, state.wireframe ])

    /**
     * Meshes
     */
    useEffect(() =>
    {
        nodes.Scene.traverse((_child) =>
        {
            if(_child.isMesh)
            {
                _child.castShadow = true
                _child.receiveShadow = true
            }
        })
    }, [])

    /**
     * Materials
     */
    materials.circuit.envMapIntensity = envMapIntensity
    materials.circuit.roughness = 0.5
    materials.circuit.wireframe = wireframe

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
        // console.log(nodes)
        nodes.battery.position.z = tween.getValue() * 1/5 * 1.5
        nodes.chipset1.position.z = tween.getValue() * 2/5 * 1.5
        nodes.chipset2.position.z = tween.getValue() * 3/5 * 1.5
        nodes.chipset3.position.z = tween.getValue() * 4/5 * 1.5
        nodes.chipset4.position.z = tween.getValue() * 5/5 * 1.5
    })

    return <>
        <primitive object={ nodes.Scene } />
    </>
}