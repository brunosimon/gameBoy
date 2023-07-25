import {  useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

export function Circuit()
{
    const { scene } = useGLTF('/models/circuit.glb')
    
    const config = useControls(
        'circuit',
        {
            position: { value: [ 0, 0, -0.35 ], min: - 3, max: 3, step: 0.01 },
            scale: { value: [ 1.4, 1.23, 0.75 ], min: 0, max: 3, step: 0.01 },
        }
    )

    return <>
        <primitive object={ scene } { ...config } />
    </>
}