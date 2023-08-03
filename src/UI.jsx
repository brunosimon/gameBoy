
import { useEffect } from 'react'
import useStore from './helpers/useStore.js'

export default function UI()
{
    const [ exploded, toggleExploded, wireframe, setWireframe ] = useStore(state => [ state.exploded, state.toggleExploded, state.wireframe, state.setWireframe ])

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

        {/* Explode button */}
        <button className="explode-button" onClick={ toggleExploded }>
            SPACE to { exploded ? 'IMPLODE' : 'EXPLODE' }
        </button>

        {/* Wireframe */}
        <div className="group">
            <div className="label">mode</div>
            <button
                className={ `choice is-mode-plain ${ !wireframe ? 'is-active' : '' }` }
                onClick={ () => setWireframe(false) }
            ><span className="icon" /></button>
            <button
                className={ `choice is-mode-wireframe ${ wireframe ? 'is-active' : '' }` }
                onClick={ () => setWireframe(true) }
            ><span className="icon" /></button>
        </div>
    </div>
}