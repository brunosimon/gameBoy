
import { useEffect } from 'react'
import useStore from './useStore.js'

export default function UI()
{
    const [ toggleExploded ] = useStore(state => [ state.toggleExploded ])

    useEffect(() =>
    {
        const handler = (event) =>
        {
            if(event.code === 'Space')
                toggleExploded()
        }

        addEventListener('keydown', handler)

        return () =>
        {
            removeEventListener('keydown', handler)
        }
    }, [])
    
    return <div className="ui">
        <button className="explode-button" onClick={ toggleExploded }>
            SPACE to explode
        </button>
    </div>
}