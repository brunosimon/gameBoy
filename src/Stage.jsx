import { Environment } from '@react-three/drei'
import { useControls } from 'leva'

export function Stage()
{
    const environmentConfig = useControls(
        'stage.environment',
        {
            preset: { value: 'apartment', options: [ 'apartment', 'city', 'dawn', 'forest', 'lobby', 'night', 'park', 'studio', 'sunset', 'warehouse', ] },
            background: { value: true },
            blur: { value: 0.5, min: 0, max: 1, step: 0.001 },
        }
    )
    
    return <>
        <Environment { ...environmentConfig } />
    </>
}