import { Environment } from '@react-three/drei'
import { useControls } from 'leva'

export function Stage()
{
    const environmentConfig = useControls(
        'stage.environment',
        {
            preset: { value: 'studio', options: [ 'apartment', 'city', 'dawn', 'forest', 'lobby', 'night', 'park', 'studio', 'sunset', 'warehouse', ] },
            background: { value: false },
            blur: { value: 0.5, min: 0, max: 1, step: 0.001 },
        }
    )
    
    return <>
        <color attach={ 'background' } args={ [ '#111111' ] } />
        <Environment { ...environmentConfig } />
    </>
}