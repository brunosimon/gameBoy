import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Screw()
{
    const model = useGLTF('/models/screw.glb')
    
    return <>
        <primitive object={ model.scene } />
    </>
}