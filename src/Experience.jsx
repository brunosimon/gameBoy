import { OrbitControls } from '@react-three/drei'
import { Effects } from './Effects.jsx'
import { Stage } from './Stage.jsx'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'
import './customToneMapping.js'
import { Cartridge } from './Cartridge.jsx'

export default function Experience()
{
    const canvasConfig = useControls(
        'canvas',
        {
            toneMapping: { value: THREE.CustomToneMapping, options: { 'ACESFilmic': THREE.ACESFilmicToneMapping, 'Cineon': THREE.CineonToneMapping, 'Reinhard': THREE.ReinhardToneMapping, 'Custom': THREE.CustomToneMapping } },
            toneMappingExposure: { value: 1.5, min: 0, max: 3, step: 0.01 },
        }
    )
    return <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 50,
            position: [ 8, - 3, 8 ]
        } }
        gl={ {
            toneMapping: canvasConfig.toneMapping,
            toneMappingExposure: canvasConfig.toneMappingExposure,
        } }
    >
        <OrbitControls makeDefault />
        <Cartridge />
        <Effects />
        <Stage />
    </Canvas>
}