import { Float } from '@react-three/drei'
import { Case } from './Case.jsx'
import { Circuit } from './Circuit.jsx'
import { Screw } from './Screw.jsx'
import { Sticker } from './Sticker.jsx'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Cartridge()
{
    const group = useRef()

    useFrame((state) =>
    {
        group.current.rotation.y = state.clock.elapsedTime * 0.1
    })

    return <group ref={ group }>
        <Float speed={ 0.3 } rotation-y={ Math.PI * 0 }>
            <Circuit />
            <Case />
            <Screw />
            <Sticker />
        </Float>
    </group>
}