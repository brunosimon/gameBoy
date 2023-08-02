import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import useStore from './useStore.js'

export function Screw()
{
    const { scene, materials } = useGLTF('/models/screw.glb')
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

    materials.screw.envMapIntensity = envMapIntensity
    
    return <>
        <primitive object={ scene } />
    </>
}