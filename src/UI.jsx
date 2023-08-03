
import { useEffect, useRef, useState } from 'react'
import useStore from './helpers/useStore.js'
import { Howl, Howler } from 'howler'

export default function UI()
{
    const [ exploded, toggleExploded, wireframe, setWireframe ] = useStore(state => [ state.exploded, state.toggleExploded, state.wireframe, state.setWireframe ])
    const firstRender = useRef(true)

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

    const [ openingSound ] = useState(() =>
    {
        return new Howl({
            src: [ './sounds/debrisOpening.mp3' ],
            volume: 0.3
        }) 
    })
    const [ closingSound ] = useState(() =>
    {
        return new Howl({
            src: [ './sounds/debrisClosing.mp3' ],
            volume: 0.3
        }) 
    })

    useEffect(() =>
    {
        if(!firstRender.current)
        {
            if(exploded)
                openingSound.play()
            else
                closingSound.play()
        }

        firstRender.current = false
    }, [ exploded ])
    
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