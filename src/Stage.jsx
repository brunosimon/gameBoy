import { Environment, Lightformer } from '@react-three/drei'
import { useControls } from 'leva'
import useStore from './helpers/useStore.js'

export function Stage()
{
    const [ envMapIntensity, setEnvMapIntensity ] = useStore(state => [ state.envMapIntensity, state.setEnvMapIntensity ])

    const environmentConfig = useControls(
        'stage.environment',
        {
            // preset: { value: 'studio', options: [ 'apartment', 'city', 'dawn', 'forest', 'lobby', 'night', 'park', 'studio', 'sunset', 'warehouse', ] },
            background: { value: false },
            blur: { value: 0, min: 0, max: 1, step: 0.001 },
            intensity: { value: envMapIntensity, min: 0, max: 1, onChange: (value) =>
            {
                if(value !== envMapIntensity)
                    setEnvMapIntensity(value)
            } }
        }
    )

    const directionalLightConfig = useControls(
        'stage.directionalLight',
        {
            color: '#ffffff',
            intensity: { value: 0.4, min: 0, max: 10, step: 0.01 },
            bias: { value: 0.00005, min: -0.001, max: 0, step: 0.00001 },
            normalBias: { value: 0.02, min: -0.1, max: 0.1, step: 0.00001 },
        }
    )
    
    const config = useControls(
        'stage',
        {
            color: '#06070a',
        }
    )

    return <>
        <color attach={ 'background' } args={ [ config.color ] } />
        <directionalLight
            position={ [ -6, 0, 2 ] }
            castShadow
            shadow-mapSize={ [ 512, 512 ] }
            color={ directionalLightConfig.color }
            intensity={ directionalLightConfig.intensity / 3 }
            shadow-bias={ directionalLightConfig.bias }
            shadow-normalBias={ directionalLightConfig.normalBias }
        />
        <directionalLight
            position={ [ -6, 0, 2 ] }
            castShadow
            shadow-mapSize={ [ 256, 256 ] }
            color={ directionalLightConfig.color }
            intensity={ directionalLightConfig.intensity / 3 }
            shadow-bias={ directionalLightConfig.bias }
            shadow-normalBias={ directionalLightConfig.normalBias }
        />
        <directionalLight
            position={ [ -6, 0, 2 ] }
            castShadow
            shadow-mapSize={ [ 128, 128 ] }
            color={ directionalLightConfig.color }
            intensity={ directionalLightConfig.intensity / 3 }
            shadow-bias={ directionalLightConfig.bias }
            shadow-normalBias={ directionalLightConfig.normalBias }
        />
        {/* <Environment { ...environmentConfig } /> */}
        <Environment files={ './envMaps/custom-002.hdr' } { ...environmentConfig } />
        {/* <Environment resolution={256}>
            <Lightformer
                position={[ -5, 0, 5]}
                form="circle" // circle | ring | rect (optional, default = rect)
                intensity={5} // power level (optional = 1)
                color="white" // (optional = white)
                scale={[1, 1]} // Scale it any way you prefer (optional = [1, 1])
                target={[0, 0, 0]} // Target position (optional = undefined)
            />
        </Environment> */}
        {/* <mesh>
            <sphereGeometry />
            <meshStandardMaterial metalness={ 1 } roughness={ 0.2 } color={ 0x888888 } />
        </mesh> */}
    </>
}