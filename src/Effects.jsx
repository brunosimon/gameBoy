import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'

export function Effects()
{
    const bloomConfig = useControls(
        'effects.bloom',
        {
            enabled: { value: false },
            luminanceThreshold: { value: 0.65, min: 0, max: 2, step: 0.001 },
            luminanceSmoothing: { value: 0.025, min: 0, max: 0.2, step: 0.0001 },
            intensity: { value: 1, min: 0, max: 10, step: 0.001 },
            radius: { value: 0.58, min: 0, max: 1, step: 0.001 },
        }
    )
    return <>
        <EffectComposer disableNormalPass>
            { bloomConfig.enabled && <Bloom mipmapBlur { ...bloomConfig } /> }
        </EffectComposer>
    </>
}